import {
    redirect
} from 'react-router-dom';

import ProfilesService, {
    ProfileFormData
} from '../services/profiles-service';
import ROUTES from '../consts/routes';

const createProfileAction = async ({ request }) => {
    const form = await request.formData();
    const profileData = Object.fromEntries(form.entries()) as ProfileFormData;

    await ProfilesService.createProfile(profileData);

    return redirect(ROUTES.PROFILE_PAGE.PATH);
};

export default createProfileAction;