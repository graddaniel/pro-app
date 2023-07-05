import axios from 'axios';

export interface Profile {
    id: number;
    name: string;
    role: string;
    description: string;
    accountId: number;
}

export type ProfileFormData = Omit<Profile, 'id' | 'accountId'>;

class ProfilesService {
    static getProfiles = async (): Promise<Profile[] | undefined> => {
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

    static createProfile = async (
        profile: ProfileFormData
    ): Promise<void> => {
        const token = `Bearer ${localStorage.getItem('token')}`;

        try {
            await axios.post('http://localhost:8081/profiles', profile, {
                headers: {
                    'Authorization': token
                }
            });
        } catch (error) {
            console.error(`[Service Error]: ${error}`);
            throw error.response;
        }
    }
}

export default ProfilesService;