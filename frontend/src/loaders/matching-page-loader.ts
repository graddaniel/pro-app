import { redirect } from 'react-router-dom';
import ProfilesService from '../services/profiles-service';

const matchingPageLoader = async () => {
    try {
        return await ProfilesService.getProfiles();
    } catch (error) {
        return redirect('/login');
    }
}

export default matchingPageLoader;