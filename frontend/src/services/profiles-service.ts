import axios from 'axios';

export interface Profile {
    id: number;
    name: string;
    role: string;
    description: string;
    accountId: number;
}

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
        profileId: number,
        accepted: boolean
    ): Promise<void> => {
        const token = `Bearer ${localStorage.getItem('token')}`;

        try {
            await axios.post(`http://localhost:8081/profiles/swipe`, {
                profileId,
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