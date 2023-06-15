import {
    redirect
} from 'react-router-dom';

import AuthService, { LoginData } from '../services/auth-service';

const loginAction = async ({ request }) => {
    const form = await request.formData();
    const loginData = Object.fromEntries(form.entries()) as LoginData;

    await new AuthService().login(loginData);

    return redirect('/');
};

export default loginAction;