import React from 'react';
import {
    useRouteError
} from 'react-router-dom';
import {
    Typography,
    Box,
    Alert
} from '@mui/material';

import RegisterForm from '../../components/registration-form';

import classes from './registration-page.module.css';

const RegistrationPage = () => {
    const error = useRouteError() as Error;

    return (
        <Box
            component='section'
            className={classes.box}
        >
            <Typography
                component='h1'
                variant='h3'
            >
                Registration
            </Typography>
            <RegisterForm />
            {error && <Alert severity='error'>{error.message}</Alert>}
        </Box>
    );
};

export default RegistrationPage;
