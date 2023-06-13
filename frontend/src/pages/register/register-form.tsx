import {
    FormControl,
    FormGroup,
    Input,
    InputLabel,
    Paper,
    Button,
    Select,
    MenuItem,
    SelectChangeEvent
} from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import * as Yup from 'yup';

import axios from 'axios';
import { Form, json, redirect, useActionData } from 'react-router-dom';
import { AccountRoles } from '../../consts/constants';

const validationSchema = Yup.object({
    username: Yup.string().required().min(8).max(32),
    password: Yup.string().required().min(8).max(32),
    email: Yup.string().email().required(),
    role: Yup.string().oneOf(Object.values(AccountRoles)).required()
});

export const registerAction = async ({ request }) => {
    const form = await request.formData();
    const formToJson = Object.fromEntries(form.entries());

    try {
        await validationSchema.validate(formToJson);
    } catch (error) {
        return json(error);
    }

    try {
        await axios.post('http://localhost:8081/api/register');
    } catch (error) {
        console.error(`[ACTION ERROR]: ${error}`);
        return json({ message: 'Something went wrong!' });
    }

    return redirect('/login');
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

const registerForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(AccountRoles.CUSTOMER);

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
            case 'confirm-password':
                setConfirmPassword(value);
                break;
            case 'email':
                setEmail(value);
                break;
        }
    };

    const handleSelectChange = (event: SelectChangeEvent<AccountRoles>) => {
        const value = event.target.value as AccountRoles;
        setRole(value);
    };

    // TODO add validation errors to the form
    return (
        <Paper
            elevation={3}
            sx={styles.paper}
        >
            <Form method='POST'>
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
                            error={password !== confirmPassword}
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
                    <FormControl
                        variant='standard'
                        fullWidth
                    >
                        <InputLabel htmlFor='role'>Role</InputLabel>
                        <Select
                            name='role'
                            value={role}
                            onChange={handleSelectChange}
                        >
                            <MenuItem value={AccountRoles.CUSTOMER}>
                                Customer
                            </MenuItem>
                            <MenuItem value={AccountRoles.SERVICE_PROVIDER}>
                                Service Provider
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        type='submit'
                        variant='contained'
                    >
                        Sign Up
                    </Button>
                </FormGroup>
            </Form>
        </Paper>
    );
};

export default registerForm;
