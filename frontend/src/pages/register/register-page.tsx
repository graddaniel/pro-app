import { Typography, Box } from '@mui/material';
import React from 'react';
import RegisterForm from './register-form';

const styles = {
    box: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
        height: '100%'
    }
};

const RegisterPage = () => {
    return (
        <Box
            component='section'
            sx={styles.box}
        >
            <Typography
                component='h1'
                variant='h3'
            >
                Register
            </Typography>
            <RegisterForm />
        </Box>
    );
};

export default RegisterPage;
