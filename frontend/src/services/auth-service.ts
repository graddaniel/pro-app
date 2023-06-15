import axios from 'axios';

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
        const response = await axios.get('http://localhost:8081/accounts/login', {
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        });

        return response.data;
    } catch (error) {
        console.error(`[ACTION ERROR]: ${error}`);
    }
}

export interface RegistrationData {
    username: string;
    password: string;
    email: string;
    role: AccountRoles;
}

export const registrationService = async ({username, password, email, role}: RegistrationData) => {
    const credentials = btoa(`${username}:${password}`);
    const requestBody = {
        email,
        role
    }

    try {
        const response = await axios.post('http://localhost:8081/accounts/register', requestBody , {
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        });

        return response.data;
    } catch (error) {
        console.error(`[ACTION ERROR]: ${error}`);
    }
}