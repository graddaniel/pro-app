import { Op, or } from 'sequelize';

import ProfileModel from '../models/profile';
import { hash } from '../utils'
import ProfileAlreadyExists from './errors/profile-already-exists';

export default class ProfilesService {
    getProfiles = async (): Promise<ProfileModel[]> => {
        return ProfileModel.findAll({});
    }

    createProfile = async (
        username: string,
        password: string,
        email: string,
    ): Promise<void> => {
        const profile = await ProfileModel.findOne({
            where: {
                [Op.or]: [
                    { username },
                    { email }
                ],
            }
        });

        if (profile) {
            throw new ProfileAlreadyExists(username, email);
        }

        ProfileModel.create({
            username,
            passwordHash: hash(password),
            email,
        });
    }
}