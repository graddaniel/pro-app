import {
    redirect
} from 'react-router-dom';

import {
    RegistrationData,
    registrationService
} from '../services/auth-service';

const registrationAction = async ({ request }) => {
    const form = await request.formData();
    const registrationData = Object.fromEntries(form.entries()) as RegistrationData;

    await registrationService(registrationData);

    return redirect('/login');
};

export default registrationAction;