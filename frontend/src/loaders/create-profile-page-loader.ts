import {
    redirect
} from 'react-router-dom';

import ProfilesService from '../services/profiles-service';

import ROUTES from '../consts/routes';

const createProfilePageLoader = async () => {
    try {
        const profile = await ProfilesService.getProfileOfAccount();

        if (profile) {
            return redirect(ROUTES.PROFILE_PAGE.PATH);
        }

        return null;
    } catch (error) {
        throw error;
    }
}

export default createProfilePageLoader;