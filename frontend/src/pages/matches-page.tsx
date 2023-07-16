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
    ListItemText,
    Table,
    TableContainer,
    Paper,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@mui/material";

import {
    Profile
} from '../services/profiles-service';

import classes from './matches-page.module.css';

const MatchesPage = () => {
    const profiles = useLoaderData() as Profile[];

    return (
        <article className={classes.container}>
            {profiles.length === 0 ? (
                <h2>No matches profiles</h2>
            ) : (
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Photo</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell align='right'>Age</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {profiles.map((profile) => (
                                <TableRow key={profile.id}>
                                    <TableCell>
                                        <Avatar />
                                    </TableCell>
                                    <TableCell>{profile.name}</TableCell>
                                    <TableCell align='right'>{profile.age}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </article>
    );
};

export default MatchesPage;