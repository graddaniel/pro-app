import {
    redirect
} from 'react-router-dom';

import ProfilesService from '../services/profiles-service';
import ROUTES from '../consts/routes';

const matchingPageLoader = async () => {
    try {
        const profile = await ProfilesService.getProfileOfAccount();

        if (!profile) {
            return redirect(ROUTES.CREATE_PROFILE_PAGE.PATH);
        }

        return await ProfilesService.getProfiles();
    } catch (error) {
        return error;
    }
}

export default matchingPageLoader;