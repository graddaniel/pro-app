import React, {
    ChangeEvent,
    useCallback
} from 'react';
import {
    FormGroup,
    Paper,
    Button,
    TextField
} from '@mui/material';
import {
    Form
} from 'react-router-dom';

import INPUT_VALIDATION from '../config/input-validation';

import classes from './login-form.module.css';

const LoginForm = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleUsernameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value), []);
    const handlePasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value), []);

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
                        required
                        inputProps={INPUT_VALIDATION.PASSWORD}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                    >
                        Login
                    </Button>
                </FormGroup>
            </Form>
        </Paper>
    );
};

export default LoginForm;