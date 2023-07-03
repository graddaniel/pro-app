import { redirect } from 'react-router-dom';
import ProfilesService from '../services/profiles-service';

const matchesPageLoader = async () => {
    try {
        return await ProfilesService.getProfiles();
    } catch (error) {
        console.log(error.response.status);
        switch (error.response.status) {
            case 404:
                return redirect('/create-profile');

            default:
                return redirect('/login');
        }
    }
}

export default matchesPageLoader;