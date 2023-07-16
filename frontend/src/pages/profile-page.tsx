import React from 'react';
import {
    Link,
    useLoaderData,
    useSubmit
} from 'react-router-dom';
import {
    Box, Button, Typography
} from '@mui/material';

import {
    Profile
} from '../services/profiles-service';

import ProfileCard from '../components/profile-card';

import classes from './profile-page.module.css';

const ProfilePage = () => {
    const profile = useLoaderData() as Profile;
    const submit = useSubmit();

    const handleLogout = async () => {
        submit(null, { method: 'POST' });
    };

    return (
        <Box
            component="section"
            className={classes.box}
        >
            <Typography component="h1" variant="h3">
                Your Profile
            </Typography>
            <ProfileCard profile={profile} />
            <Button
                variant='contained'
                color='primary'
                onClick={handleLogout}
            >Logout
            </Button>
        </Box >
    );
};

export default ProfilePage;