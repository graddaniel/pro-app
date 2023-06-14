import {
    redirect
} from 'react-router-dom';
import {
    LoginData,
    loginService,
    RegistrationData,
    registrationService
} from '../services/auth-service';

export const loginAction = async ({ request }) => {
    const form = await request.formData();
    const loginData = Object.fromEntries(form.entries()) as LoginData;
    
    await loginService(loginData);

    return redirect('/');
};

export const registrationAction = async ({ request }) => {
    const form = await request.formData();
    const registrationData = Object.fromEntries(form.entries()) as RegistrationData;

    await registrationService(registrationData);

    return redirect('/login');
};