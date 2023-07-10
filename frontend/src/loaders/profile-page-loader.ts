import { redirect } from 'react-router-dom';

import AccountHasNoProfileError from '../services/errors/account-has-no-profile-error';
import ProfilesService from '../services/profiles-service';

import ROUTES from '../consts/routes';

const profilePageLoader = async () => {
    try {
        return await ProfilesService.getProfileOfAccount();
    } catch (error) {
        if (error instanceof AccountHasNoProfileError) {
            return redirect(ROUTES.CREATE_PROFILE_PAGE.PATH);
        }

        throw error;
    }
}

export default profilePageLoader;