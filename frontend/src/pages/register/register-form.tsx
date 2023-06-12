import {
    FormControl,
    FormGroup,
    Input,
    InputLabel,
    Paper,
    Button
} from '@mui/material';
import React, { FormEventHandler, ChangeEvent } from 'react';

import axios from 'axios';

const styles = {
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem',
        margin: '1rem'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
    }
};

const registerForm = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        try {
            setLoading(true);
            const response = await axios.post(
                'http://localhost:8081/api/register',
                data
            );

            // TODO Redirect to login page
            console.log(response.data);
        } catch (error) {
            // TODO Error handling
            console.log(error);
        }

        setLoading(false);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirm-password':
                setConfirmPassword(value);
                break;
            case 'email':
                setEmail(value);
                break;
        }
    };

    return (
        <Paper
            elevation={3}
            sx={styles.paper}
            component={'form'}
            method='POST'
            onSubmit={handleSubmit}
        >
            <FormGroup sx={styles.formGroup}>
                <FormControl>
                    <InputLabel htmlFor='username'>Username</InputLabel>
                    <Input
                        name='username'
                        type='text'
                        aria-describedby='username-helper-text'
                        value={username}
                        onChange={handleInputChange}
                        required
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor='password'>Password</InputLabel>
                    <Input
                        name='password'
                        type='password'
                        aria-describedby='password-helper-text'
                        value={password}
                        onChange={handleInputChange}
                        required
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor='confirm-password'>
                        Confirm Password
                    </InputLabel>
                    <Input
                        name='confirm-password'
                        type='password'
                        aria-describedby='confirm-password-helper-text'
                        value={confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor='email'>Email</InputLabel>
                    <Input
                        name='email'
                        type='email'
                        aria-describedby='email-helper-text'
                        value={email}
                        onChange={handleInputChange}
                        required
                    />
                </FormControl>
                <Button
                    type='submit'
                    variant='contained'
                    disabled={loading}
                >
                    Sign Up
                </Button>
            </FormGroup>
        </Paper>
    );
};

export default registerForm;
