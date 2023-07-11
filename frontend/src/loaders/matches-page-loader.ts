import { redirect } from 'react-router-dom';

import ProfilesService from '../services/profiles-service';

import ROUTES from '../consts/routes';

const matchesPageLoader = async () => {
    try {
        const profile = await ProfilesService.getProfileOfAccount();

        if (!profile) {
            return redirect(ROUTES.CREATE_PROFILE_PAGE.PATH);
        }

        return await ProfilesService.getMatches();
    } catch (error) {
        throw error;
    }
};

export default matchesPageLoader;