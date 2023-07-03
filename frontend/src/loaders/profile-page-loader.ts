import { redirect } from 'react-router-dom';
import ProfilesService from '../services/profiles-service';

const profilePageLoader = async () => {
    try {
        await ProfilesService.getProfile();
    } catch (error) {
        switch (error.response.status) {
            case 404:
                return redirect('/create-profile');

            default:
                return redirect('/login');
        }
    }
}

export default profilePageLoader;