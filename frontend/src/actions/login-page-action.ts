import {
    redirect
} from 'react-router-dom';

import AuthService, { LoginData } from '../services/auth-service';

const loginAction = async ({ request }) => {
    const form = await request.formData();
    const loginData = Object.fromEntries(form.entries()) as LoginData;

    const token = await new AuthService().login(loginData);
    localStorage.setItem('token', token);

    return redirect('/');
};

export default loginAction;