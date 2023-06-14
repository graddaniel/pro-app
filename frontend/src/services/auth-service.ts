import axios from 'axios';
import {
    json,
} from 'react-router-dom';

import {
    AccountRoles
} from '../consts/constants';

export interface LoginData {
    username: string;
    password: string;
}

export const loginService = async ({ username, password }: LoginData) => {
    const credentials = btoa(`${username}:${password}`);

    try {
        const response = await axios.post('http://localhost:8081/accounts/login', null, {
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        });

       // TODO - save token and catch error codes

        return response.data;
    } catch (error) {
        console.error(`[ACTION ERROR]: ${error}`);
        return json({ error });
    }
}

export interface RegistrationData {
    username: string;
    password: string;
    email: string;
    role: AccountRoles;
}

export const registrationService = async ({username, password, email, role}: RegistrationData) => {
    const credentials = btoa(`${username}:${password}:${email}:${role}`);

    try {
        const response = await axios.post('http://localhost:8081/accounts/register', null , {
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        });

        // TODO - save token and catch error codes

        return response.data;
    } catch (error) {
        console.error(`[ACTION ERROR]: ${error}`);
        return json({ error });
    }
}