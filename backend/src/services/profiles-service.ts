import ProfileModel from '../models/profile';
import { hash } from '../utils'

export default class ProfilesService {
    getProfiles = async (): Promise<ProfileModel[]> => {
        return ProfileModel.findAll({});
    }

    createProfile = async (
        username: string,
        password: string,
        email: string,
    ): Promise<void> => {
        ProfileModel.create({
            username,
            passwordHash: hash(password),
            email,
        });
    }
}