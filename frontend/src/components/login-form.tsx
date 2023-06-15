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

import classes from './login-form.module.css';

const InputProps = {
    minLength: 8,
    maxLength: 32
};

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
                        inputProps={{
                            ...InputProps,
                            pattern: '^[a-zA-Z0-9]+$'
                        }}
                    />
                    <TextField
                        name="password"
                        label="password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        inputProps={InputProps}
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