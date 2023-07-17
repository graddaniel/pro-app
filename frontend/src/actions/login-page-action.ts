import {
    redirect
} from 'react-router-dom';

import AuthService, { LoginData } from '../services/auth-service';
import ROUTES from '../consts/routes';

const loginAction = async ({ request }) => {
    const form = await request.formData();
    const loginData = Object.fromEntries(form.entries()) as LoginData;

    await AuthService.login(loginData);

    return redirect(ROUTES.MATCHING_PAGE.PATH);
};

export default loginAction;