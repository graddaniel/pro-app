import { redirect } from 'react-router-dom';


import ProfilesService from '../services/profiles-service';
import AccountHasNoProfileError from '../services/errors/account-has-no-profile-error';

import ROUTES from '../consts/routes';

const matchesPageLoader = async () => {
    try {
        await ProfilesService.getProfileOfAccount();

        return await ProfilesService.getMatches();
    } catch (error) {
        if (error instanceof AccountHasNoProfileError) {
            return redirect(ROUTES.CREATE_PROFILE_PAGE.PATH);
        }
        throw error;
    }
};

export default matchesPageLoader;