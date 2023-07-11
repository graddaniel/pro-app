import { redirect } from 'react-router-dom';

import ProfilesService from '../services/profiles-service';

import ROUTES from '../consts/routes';

const profilePageLoader = async () => {
    try {
        const profile = await ProfilesService.getProfileOfAccount();

        if (!profile) {
            return redirect(ROUTES.CREATE_PROFILE_PAGE.PATH);
        }

        return profile;
    } catch (error) {
        throw error;
    }
}

export default profilePageLoader;