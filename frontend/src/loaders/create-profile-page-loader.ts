import {
    redirect
} from 'react-router-dom';

import AccountHasNoProfileError from '../services/errors/account-has-no-profile-error';
import ProfilesService from '../services/profiles-service';

import ROUTES from '../consts/routes';

const createProfilePageLoader = async () => {
    try {
        const profile = await ProfilesService.getProfileOfAccount();

        if (profile) {
            return redirect(ROUTES.PROFILE_PAGE.PATH);
        }

    } catch (error) {
        if (error instanceof AccountHasNoProfileError) {
            return null;
        }
        throw error;
    }
}

export default createProfilePageLoader;