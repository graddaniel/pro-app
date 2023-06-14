import {
    FormGroup,
    TextField,
    Paper,
    Button,
} from '@mui/material';
import React, {
    ChangeEvent,
    useState
} from 'react';
import {
    Form,
    useActionData
} from 'react-router-dom';
import {
    AccountRoles
} from '../consts/constants';

import classes from './registration-form.module.css';

const InputProps = {
    minLength: 8,
    maxLength: 32
};

const registerForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(AccountRoles.CUSTOMER);

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
                    <TextField
                        name="confirm-password"
                        label="confirm password"
                        type="password"
                        value={confirmPassword}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value)}
                        error={password !== confirmPassword}
                        required
                        inputProps={InputProps}
                    />
                    <TextField
                        name="email"
                        label="email"
                        type="email"
                        value={email}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                        required
                    />
                    <TextField
                        name="role"
                        label="role"
                        select
                        value={role}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setRole(event.target.value as AccountRoles)}
                        required
                    >
                        <option value={AccountRoles.CUSTOMER}>Customer</option>
                        <option value={AccountRoles.SERVICE_PROVIDER}>Service Provider</option>
                    </TextField>
                    <Button
                        type="submit"
                        variant="contained"
                    >
                        Sign Up
                    </Button>
                </FormGroup>
            </Form>
        </Paper>
    );
};

export default registerForm;
