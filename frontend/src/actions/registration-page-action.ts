import {
    redirect
} from 'react-router-dom';

import AuthService, {
    RegistrationData,
} from '../services/auth-service';
import ROUTES from '../consts/routes';

const registrationAction = async ({ request }) => {
    const form = await request.formData();
    const registrationData = Object.fromEntries(form.entries()) as RegistrationData;

    const token = await AuthService.register(registrationData);
    localStorage.setItem('token', token);

    return redirect(ROUTES.CREATE_PROFILE_PAGE.PATH);
};

export default registrationAction;