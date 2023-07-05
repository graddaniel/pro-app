import { Op, col } from 'sequelize';

import SwipesService from './swipes-service';
import MatchesService, { Match } from './matches-service';
import SequelizeConnection from './sequelize-connection';

import { AccountRoles } from '../generic/constants';
import ProfileModel from '../models/profile';
import SwipeModel from '../models/swipe';
import MatchModel from '../models/matches';

import ProfileAlreadyExistsError from './errors/profile-already-exists-error';
import ProfileNotFoundError from './errors/profile-not-found-error';
import UnexpectedRoleError from './errors/unexpected-role-error';
import SameProfileRoleError from './errors/same-profile-role-error';
import MatchAlreadyExistsError from './errors/match-already-exists-error';

export default class ProfilesService {
    private matchesService: MatchesService;
    private swipesService: SwipesService;

    constructor(
        matchesService: MatchesService,
        swipesService: SwipesService
    ) {
        this.matchesService = matchesService;
        this.swipesService = swipesService;
    }

    getProfilesToSwipe = async (
        accountId: number
    ): Promise<ProfileModel[]> => {
        const accountProfile = await this.getProfileByAccountId(accountId);
        const {
            id: profileId,
            role
        } = accountProfile;

        let searchedRole: AccountRoles | null = null;
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
            include: [
                {
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
                },
                {
                    model: MatchModel,
                    attributes: [],
                    on: role === AccountRoles.CUSTOMER
                        ? {
                            [Op.or]: [
                                {
                                    customer_profile_id: { [Op.eq]: profileId },
                                    professional_profile_id: { [Op.eq]: col('profile.id') }
                                },
                                {
                                    professional_profile_id: { [Op.eq]: profileId },
                                    customer_profile_id: { [Op.eq]: col('profile.id') }
                                }
                            ]
                        }
                        : {
                            [Op.or]: [
                                {
                                    professional_profile_id: { [Op.eq]: profileId },
                                    customer_profile_id: { [Op.eq]: col('profile.id') }
                                },
                                {
                                    customer_profile_id: { [Op.eq]: profileId },
                                    professional_profile_id: { [Op.eq]: col('profile.id') }
                                }
                            ]
                        },
                    required: false
                }
            ],
            where: {
                role: searchedRole,
                [Op.or]: [
                    {
                        '$swipes.source_profile_id$': { [Op.eq]: col('profile.id') },
                        '$swipes.accepted$': true
                    },
                    {
                        '$swipes.accepted$': null
                    }
                ],
                [Op.not]: { '$matches.id$': { [Op.not]: null } }
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
            throw new ProfileNotFoundError(accountId);
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
            throw new ProfileNotFoundError(profileId);
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
            throw new ProfileAlreadyExistsError();
        }

        await ProfileModel.create({
            accountId,
            name,
            age,
            description,
            role
        });
    }

    swipeProfile = SequelizeConnection.transaction(async (
        accountId: number,
        profileToSwipeId: number,
        accepted: boolean
    ): Promise<void> => {
        const profile = await this.getProfileByAccountId(accountId);
        const profileToSwipe = await this.getProfileById(profileToSwipeId);

        if (await this.matchesService.checkIfMatchExist(profile.id, profileToSwipeId)) {
            throw new MatchAlreadyExistsError(profile.id, profileToSwipeId);
        }

        if (profile.role === profileToSwipe.role) {
            throw new SameProfileRoleError(profile.id, profileToSwipeId);
        }


        await this.swipesService.createSwipe({
            source_profile_id: profile.id,
            target_profile_id: profileToSwipeId,
            accepted
        });

        if (!accepted) {
            return;
        };

        const oppositeSwipe = await this.swipesService.getSwipe(profileToSwipeId, profile.id);
        if (!oppositeSwipe || !oppositeSwipe.accepted) {
            return;
        };

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

        await this.matchesService.createMatch(match);
    });
}