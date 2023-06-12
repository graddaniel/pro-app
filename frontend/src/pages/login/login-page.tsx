import React from 'react';
import { Box, Typography } from '@mui/material';
import LoginForm from './login-form';

const loginPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '1rem',
                height: '100%'
            }}
        >
            <Typography
                component='h1'
                variant='h3'
            >
                Login
            </Typography>
            <LoginForm />
        </Box>
    );
};

export default loginPage;
