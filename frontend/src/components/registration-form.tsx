import {
    FormGroup,
    TextField,
    Paper,
    Button
} from '@mui/material';
import React, {
    ChangeEvent,
    useState,
    useCallback
} from 'react';
import {
    Form,
    useActionData,
} from 'react-router-dom';

import type ActionResult from '../generics/action-result';
import INPUT_VALIDATION from '../config/input-validation';

import classes from './registration-form.module.css';

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const actionData = useActionData() as ActionResult | undefined;

    const handleUsernameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value), []);
    const handlePasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value), []);
    const handleConfirmPasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value), []);
    const handleEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value), []);

    const isFormValid =
        username &&
        password &&
        confirmPassword &&
        email;

    return (
        <Paper
            elevation={3}
            className={classes.paper}
        >
            <Form method="POST">
                <FormGroup className={classes.formGroup}>
                    <TextField
                        name="username"
                        label="username"
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                        inputProps={INPUT_VALIDATION.USERNAME}
                    />
                    <TextField
                        name="password"
                        label="password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        error={actionData?.type === 'password'}
                        helperText={actionData?.message}
                        required
                        inputProps={INPUT_VALIDATION.PASSWORD}
                    />
                    <TextField
                        name="confirmPassword"
                        label="confirm password"
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                        inputProps={INPUT_VALIDATION.PASSWORD}
                    />
                    <TextField
                        name="email"
                        label="email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!isFormValid}
                    >
                        Sign Up
                    </Button>
                </FormGroup>
            </Form>
        </Paper>
    );
};

export default RegistrationForm;
