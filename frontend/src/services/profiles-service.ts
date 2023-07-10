import axios from 'axios';
import { StatusCodes } from 'http-status-codes';

import AccountHasNoProfileError from './errors/account-has-no-profile-error';

export interface Profile {
    id: number;
    name: string;
    role: string;
    description: string;
    accountId: number;
}

class ProfilesService {
    static getProfiles = async (): Promise<Profile[]> => {
        const token = `Bearer ${localStorage.getItem('token')}`;

        try {
            const response = await axios.get('http://localhost:8081/profiles', {
                headers: {
                    'Authorization': token
                }
            });

            return response.data;
        } catch (error) {
            console.error(`[Service Error]: ${error}`);

            throw Error(error.response.data);
        }
    }

    static getProfileOfAccount = async (): Promise<Profile> => {
        const token = `Bearer ${localStorage.getItem('token')}`;

        try {
            const response = await axios.get('http://localhost:8081/profiles/ofAccount', {
                headers: {
                    'Authorization': token
                }
            });

            return response.data as Profile;
        } catch (error) {
            console.error(`[Service Error]: ${error}`);
            if (error.response.status === StatusCodes.CONFLICT) {
                throw new AccountHasNoProfileError();
            }
            throw Error(error.response.data);
        }
    }

    static getMatches = async (): Promise<Profile[]> => {
        const token = `Bearer ${localStorage.getItem('token')}`;

        try {
            const response = await axios.get('http://localhost:8081/profiles/matches', {
                headers: {
                    'Authorization': token
                }
            });

            return response.data;
        } catch (error) {
            console.error(`[Service Error]: ${error}`);
            throw Error(error.response.data);
        }
    }

    static swipeProfile = async (
        id: number,
        accepted: boolean
    ): Promise<void> => {
        const token = `Bearer ${localStorage.getItem('token')}`;

        try {
            await axios.post(`http://localhost:8081/profiles/swipe`, {
                id,
                accepted
            }, {
                headers: {
                    'Authorization': token
                }
            });
        } catch (error) {
            console.error(`[Service Error]: ${error}`);
            throw Error('Something went wrong when you swipe.');
        }
    }
}

export default ProfilesService;