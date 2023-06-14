import React from 'react';
import {
    Typography,
    Box
} from '@mui/material';

import RegisterForm from '../../components/registration-form';

import classes from './registration-page.module.css';

const RegisterPage = () => {
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
        </Box>
    );
};

export default RegisterPage;
