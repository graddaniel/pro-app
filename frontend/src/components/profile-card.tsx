import React from 'react';
import { Box, Typography } from '@mui/material';

import { Profile } from '../services/profiles-service';

import classes from './profile-card.module.css';

interface ProfileCardProps {
    profile: Profile;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
    return (
        <Box className={classes.profileCard}>
            <Box>
                <img
                    className={classes.profileCard__image}
                    src="https://images.unsplash.com/photo-1651004926916-b4e92f4df1ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                    alt="Profile images"
                />
            </Box>
            <Typography component="h2" variant="h5">Name: {profile.name}</Typography>
            <Typography component="p" variant='body1'>Description: {profile.description}</Typography>
        </Box>
    )
}

export default ProfileCard;