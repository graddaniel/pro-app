import React from "react";
import { Profile } from "../services/profiles-service";
import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";

interface ProfilesListProps {
    profiles: Profile[];
}

const ProfilesList = ({ profiles }: ProfilesListProps) => {
    return (
        <List dense sx={{
            backgroundColor: 'background.paper',
            minWidth: 300
        }}>
            {profiles.map((profile) => (
                <ListItem key={profile.id}>
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar />
                        </ListItemAvatar>
                        <ListItemText primary={profile.name} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
};

export default ProfilesList;