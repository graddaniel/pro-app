import { Op, col } from 'sequelize';

import SwipesService from './swipes-service';
import MatchesService from './matches-service';

import { AccountRoles } from '../generic/constants';
import { Match } from '../generic/types';
import ProfileModel from '../models/profile';
import SwipeModel from '../models/swipe';

import ProfileAlreadyExists from './errors/profile-already-exists-error';
import ProfileNotFound from './errors/profile-not-found-error';
import UnexpectedRoleError from './errors/unexpected-role-error';
import SameRoleError from './errors/same-role-error';

export default class ProfilesService {
    getProfiles = async (
        accountId: number
    ): Promise<ProfileModel[]> => {
        const accountProfile = await this.getProfileByAccountId(accountId);
        const {
            id: profileId,
            role
        } = accountProfile;

        let searchedRole: AccountRoles | null = null
        switch (role) {
            case AccountRoles.CUSTOMER:
                searchedRole = AccountRoles.PROFESSIONAL;
                break;
            case AccountRoles.PROFESSIONAL:
                searchedRole = AccountRoles.CUSTOMER;
                break;
            default:
                throw new UnexpectedRoleError(role);
        }

        const profiles = await ProfileModel.findAll({
            attributes: ['id', 'name', 'age', 'description'],
            include: [{
                model: SwipeModel,
                attributes: [],
                on: {
                    [Op.or]: [
                        {
                            [Op.and]: {
                                source_profile_id: { [Op.eq]: profileId },
                                target_profile_id: { [Op.eq]: col('profile.id') }
                            }
                        },
                        {
                            [Op.and]: {
                                source_profile_id: { [Op.eq]: col('profile.id') },
                                target_profile_id: { [Op.eq]: profileId }
                            }
                        }
                    ]

                },
                required: false
            }],
            where: {
                [Op.and]: {
                    role: searchedRole,
                    [Op.or]: [
                        {
                            '$swipes.source_profile_id$': { [Op.eq]: col('profile.id') },
                            '$swipes.accepted$': true
                        },
                        {
                            '$swipes.accepted$': null
                        }
                    ]
                }
            }
        });

        return profiles;
    }


    getProfileByAccountId = async (
        accountId: number
    ): Promise<ProfileModel> => {
        const profile = await ProfileModel.findOne({
            where: {
                accountId,
            }
        });

        if (!profile) {
            throw new ProfileNotFound(accountId);
        }

        return profile;
    }

    getProfileById = async (
        profileId: number
    ): Promise<ProfileModel> => {
        const profile = await ProfileModel.findOne({
            where: {
                id: profileId,
            }
        });

        if (!profile) {
            throw new ProfileNotFound(profileId);
        }

        return profile;
    }

    createProfile = async (
        accountId: number,
        name: string,
        age: number,
        description: string,
        role: string
    ): Promise<void> => {
        const foundProfile = await ProfileModel.findOne({
            where: {
                accountId,
            }
        });
        if (foundProfile) {
            throw new ProfileAlreadyExists();
        }

        ProfileModel.create({
            accountId,
            name,
            age,
            description,
            role
        });
    }

    swipeProfile = async (
        accountId: number,
        profileToSwipeId: number,
        accepted: boolean
    ): Promise<void> => {
        const profile = await this.getProfileByAccountId(accountId);
        const profileToSwipe = await this.getProfileById(profileToSwipeId);

        if (profile.role === profileToSwipe.role) {
            throw new SameRoleError();
        }

        await SwipesService.createSwipe({
            source_profile_id: profile.id,
            target_profile_id: profileToSwipeId,
            accepted
        });

        if (!accepted) return;

        const oppositeSwipe = await SwipesService.getSwipe(profileToSwipeId, profile.id);
        if (!oppositeSwipe || !oppositeSwipe.accepted) return;

        let match: Match | null = null;
        switch (profile.role) {
            case AccountRoles.CUSTOMER:
                match = {
                    customer_profile_id: profile.id,
                    professional_profile_id: profileToSwipeId
                };
                break;
            case AccountRoles.PROFESSIONAL:
                match = {
                    customer_profile_id: profileToSwipeId,
                    professional_profile_id: profile.id
                };
                break;
            default:
                throw new UnexpectedRoleError(profile.role);
        }

        await MatchesService.createMatch(match);
    }
}