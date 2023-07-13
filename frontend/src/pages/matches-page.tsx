import React from 'react';
import {
    useLoaderData
} from 'react-router-dom';
import {
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText
} from "@mui/material";

import {
    Profile
} from '../services/profiles-service';

import classes from './matches-page.module.css';

const MatchesPage = () => {
    const profiles = useLoaderData() as Profile[];

    return (
        <article className={classes.container}>
            { profiles.length === 0 ? (
        <h2>No matches profiles</h2>
    ) : ( 
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
    ) }
        </article>
    );
};

export default MatchesPage;