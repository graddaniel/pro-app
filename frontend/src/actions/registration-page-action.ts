import {
    redirect
} from 'react-router-dom';

import AuthService, {
    RegistrationData,
} from '../services/auth-service';

const registrationAction = async ({ request }) => {
    const form = await request.formData();
    const registrationData = Object.fromEntries(form.entries()) as RegistrationData;

    const token = await new AuthService().register(registrationData);
    localStorage.setItem('token', token);

    return redirect('/');
};

export default registrationAction;