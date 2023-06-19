import axios from 'axios';

export interface LoginData {
    username: string;
    password: string;
}

export interface RegistrationData {
    username: string;
    password: string;
    email: string;
}

class AuthService {

    login = async ({ username, password }: LoginData) => {
        const credentials = btoa(`${username}:${password}`);

        try {
            const response = await axios.get('http://localhost:8081/accounts', {
                headers: {
                    'Authorization': `Basic ${credentials}`
                }
            });

            return response.data;
        } catch (error) {
            console.error(`[ACTION ERROR]: ${error}`);
        }
    }

    register = async ({ username, password, email }: RegistrationData) => {
        const credentials = btoa(`${username}:${password}`);
        const requestBody = {
            email
        }

        try {
            const response = await axios.post('http://localhost:8081/accounts', requestBody, {
                headers: {
                    'Authorization': `Basic ${credentials}`
                }
            });

            return response.data;
        } catch (error) {
            console.error(`[ACTION ERROR]: ${error}`);
        }
    }
}

export default AuthService;