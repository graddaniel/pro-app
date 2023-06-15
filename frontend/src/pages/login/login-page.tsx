import React from 'react';
import {
    Box,
    Typography
} from '@mui/material';

import LoginForm from '../../components/login-form';

import classes from './login-page.module.css';

const LoginPage = () => {
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
        </Box>
    );
};

export default LoginPage;
