import ProfileModel from '../models/profile';
import { hash } from '../utils'
import ProfileAlreadyExists from './errors/profile-already-exists-error';

export default class ProfilesService {
    getProfiles = async (): Promise<ProfileModel[]> => {
        return ProfileModel.findAll({});
    }

    getProfileByAccountId = async (
        accountId: number
    ): Promise<ProfileModel | null> => {
        return ProfileModel.findOne({
            where: {
                accountId,
            }
        });
    }

    createProfile = async (
        accountId: number,
        description: string,
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
            description,
        });
    }
}