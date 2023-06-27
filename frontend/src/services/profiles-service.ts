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
            console.error(`[LOADER ERROR]: ${error}`);
        }
    }
}

export default ProfilesService;