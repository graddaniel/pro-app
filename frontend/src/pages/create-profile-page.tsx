import React from 'react';
import {
    useRouteError
} from 'react-router-dom';
import {
    Typography,
    Box,
    Alert
} from '@mui/material';

import ProfileForm from '../components/profile-form';

import classes from './create-profile-page.module.css';

const CreateProfilePage = () => {
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
                Create Profile
            </Typography>
            <ProfileForm />
            {error && <Alert severity='error'>{error.message}</Alert>}
        </Box>
    );
};

export default CreateProfilePage;