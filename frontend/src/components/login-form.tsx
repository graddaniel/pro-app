import React, {
    ChangeEvent,
    useCallback
} from 'react';
import {
    FormGroup,
    Paper,
    Button,
    TextField,
    Typography
} from '@mui/material';
import {
    Form,
    Link
} from 'react-router-dom';

import classes from './login-form.module.css';
import ROUTES from '../consts/routes';

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
            <Typography sx={{ marginTop: '1rem' }}>
                No account yet?{' '}
                <Link to={ROUTES.REGISTRATION_PAGE.PATH}>Sign up!</Link>
            </Typography>
        </Paper>
    );
};

export default LoginForm;