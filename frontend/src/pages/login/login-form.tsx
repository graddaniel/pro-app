import React, { ChangeEvent } from 'react';
import axios from 'axios';
import {
    FormControl,
    FormGroup,
    Paper,
    Input,
    Button,
    InputLabel
} from '@mui/material';
import * as Yup from 'yup';

import { Form, json, redirect, useActionData } from 'react-router-dom';

const validationSchema = Yup.object({
    username: Yup.string().required().min(8).max(32),
    password: Yup.string().required().min(8).max(32)
});

export const loginAction = async ({ request }) => {
    const form = await request.formData();
    const formToJson = Object.fromEntries(form.entries());

    try {
        await validationSchema.validate(formToJson);
    } catch (error) {
        return json(error);
    }

    try {
        await axios.post('http://localhost:8081/api/login');
    } catch (error) {
        console.error(`[ACTION ERROR]: ${error}`);
        return json({ message: 'Something went wrong!' });
    }

    return redirect('/');
};

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

const loginForm = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const actionData = useActionData();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
        }
    };

    // TODO add validation error messages
    return (
        <Paper
            elevation={3}
            sx={styles.paper}
        >
            <Form method='post'>
                <FormGroup sx={styles.formGroup}>
                    <FormControl>
                        <InputLabel htmlFor='username'>Username</InputLabel>
                        <Input
                            name='username'
                            type='text'
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
                            value={password}
                            onChange={handleInputChange}
                            required
                        />
                    </FormControl>
                    <Button
                        type='submit'
                        variant='contained'
                    >
                        Login
                    </Button>
                </FormGroup>
            </Form>
        </Paper>
    );
};

export default loginForm;
