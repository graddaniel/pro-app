import {
    redirect
} from 'react-router-dom';

import AuthService, {
    RegistrationData,
} from '../services/auth-service';

const registrationAction = async ({ request }) => {
    const form = await request.formData();
    const registrationData = Object.fromEntries(form.entries()) as RegistrationData;

    await new AuthService().registration(registrationData);

    return redirect('/login');
};

export default registrationAction;