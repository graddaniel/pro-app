import axios from 'axios';

export interface LoginData {
    username: string;
    password: string;
}

export interface RegistrationData {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
}

class AuthService {
    static login = async ({ username, password }: LoginData): Promise<void> => {
        const credentials = btoa(`${username}:${password}`);

        try {
            const response = await axios.get('http://localhost:8081/accounts', {
                headers: {
                    'Authorization': `Basic ${credentials}`
                }
            });

            localStorage.setItem('token', response.data);
        } catch (error) {
            console.error(`[Service Error]: ${error}`);
            throw Error(error.response.data);
        }
    }

    static register = async ({ username, password, email }: RegistrationData): Promise<void> => {
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

            localStorage.setItem('token', response.data);
        } catch (error) {
            console.error(`[Service Error]: ${error}`);
            throw Error(error.response.data);
        }
    }
    static logout = (): void => {
        localStorage.removeItem('token');
    }
}

export default AuthService;