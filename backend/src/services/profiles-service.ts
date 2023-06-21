import { Op, col, or } from 'sequelize';
import { AccountRoles } from '../generic/constants';
import ProfileModel from '../models/profile';
import SwipeModel from '../models/swipe';

import ProfileAlreadyExists from './errors/profile-already-exists-error';
import ProfileNotFound from './errors/profile-not-found-error';
import UnexpectedRoleError from './errors/unexpected-role-error';

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
                    source_profile_id: { [Op.eq]: col('profile.id') },
                },
                required: false
            }],
            where: {
                [Op.and]: {
                    role: searchedRole,
                    [Op.or]: [
                        {
                            '$swipes.target_profile_id$': null
                        },
                        {
                            '$swipes.target_profile_id$': profileId,
                            '$swipes.accepted$': true
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
}