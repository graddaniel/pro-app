import React from 'react';
import { useRouteError } from 'react-router-dom';
import {
    Alert,
    Box,
    Typography
} from '@mui/material';

import LoginForm from '../../components/login-form';

import classes from './login-page.module.css';

const LoginPage = () => {
    const error = useRouteError() as Error;

    return (
        <Box
            className={classes.box}
        >
            <Typography
                component="h1"
                variant="h3"
            >
                Login
            </Typography>
            <LoginForm />
            {error && <Alert severity='error'>{error.message}</Alert>}
        </Box>
    );
};

export default LoginPage;
