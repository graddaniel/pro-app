import {
    redirect
} from 'react-router-dom';

import ProfilesService, {
    ProfileFormData
} from '../services/profiles-service';

const createProfileAction = async ({ request }) => {
    const form = await request.formData();
    const profileData = Object.fromEntries(form.entries()) as ProfileFormData;

    try {
        await ProfilesService.createProfile(profileData);
    } catch (error) {
        return error;
    }

    return redirect('/matching');
};

export default createProfileAction;