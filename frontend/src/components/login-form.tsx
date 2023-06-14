import React, {
    ChangeEvent
} from 'react';
import {
    FormGroup,
    Paper,
    Button,
    TextField
} from '@mui/material';
import {
    Form,
    useActionData
} from 'react-router-dom';

import classes from './login-form.module.css';

const InputProps = {
    minLength: 8,
    maxLength: 32
};

const LoginForm = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const actionData = useActionData();

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
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
                        required
                        inputProps={InputProps}
                    />
                    <TextField
                        name="password"
                        label="password"
                        type="password"
                        value={password}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
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