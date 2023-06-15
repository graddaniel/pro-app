import {
    json,
    redirect
} from 'react-router-dom';

import {
    LoginData,
    loginService,
} from '../services/auth-service';

const loginAction = async ({ request }) => {
    const form = await request.formData();
    const loginData = Object.fromEntries(form.entries()) as LoginData;
    
    await loginService(loginData);

    return redirect('/');
};

export default loginAction;