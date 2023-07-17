import {
    redirect
} from 'react-router-dom';

import AuthService, {
    RegistrationData,
} from '../services/auth-service';
import ActionResult from '../generics/action-result';

import ROUTES from '../consts/routes';

const registrationAction = async ({ request }) => {
    const form = await request.formData();
    const registrationData = Object.fromEntries(form.entries()) as RegistrationData;

    if (registrationData.password !== registrationData.confirmPassword) {
        return new ActionResult(false, 'password', 'Passwords do not match')
    }

    await AuthService.register(registrationData);

    return redirect(ROUTES.CREATE_PROFILE_PAGE.PATH);
};

export default registrationAction;