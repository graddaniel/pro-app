import { redirect } from 'react-router-dom';
import ProfilesService from '../services/profiles-service';

const createProfilePageLoader = async () => {
    try {
        await ProfilesService.getProfile();
        return redirect('/profile');
    } catch (error) {
        switch (error.response.status) {
            case 404:
                return new Response(null, { status: 200 });

            default:
                return redirect('/login');
        }
    }
}

export default createProfilePageLoader;