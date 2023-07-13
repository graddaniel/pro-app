import React from 'react';
import {
    useLoaderData
} from 'react-router-dom';
import {
    Box, Typography
} from '@mui/material';

import {
    Profile
} from '../services/profiles-service';

import ProfileCard from '../components/profile-card';

import classes from './profile-page.module.css';

const ProfilePage = () => {
    const profile = useLoaderData() as Profile;

    return (
        <Box
            component="section"
            className={classes.box}
        >
            <Typography component="h1" variant="h3">
                Your Profile
            </Typography>
            <ProfileCard profile={profile}/>
        </Box>
    );
};

export default ProfilePage;