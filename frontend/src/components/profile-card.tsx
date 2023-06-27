import React from 'react';
import { Box } from '@mui/material';

import { Profile } from '../services/profiles-service';

interface ProfileCardProps {
    profile: Profile;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
    return (
        <Box>
            Profile name: {profile.name}
        </Box>
    )
}

export default ProfileCard;