import React from 'react';
import { Box, Typography } from '@mui/material';

import { Profile } from '../services/profiles-service';
import FakePhoto from '../../assets/images/profile.jpg';

import classes from './profile-card.module.css';

interface ProfileCardProps {
    profile: Profile;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
    return (
        <Box className={classes.profileCard}>
            <Box className={classes.profileCard__overlay} />
            <Box>
                <img
                    className={classes.profileCard__image}
                    src={FakePhoto}
                    alt="Profile images"
                />
            </Box>
            <Typography component="h2" variant="h5">Name: {profile.name}</Typography>
            <Typography component="p" variant='body1'>Description: {profile.description}</Typography>
        </Box>
    )
}

export default ProfileCard;