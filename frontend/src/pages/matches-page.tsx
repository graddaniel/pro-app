import React from 'react';
import {
    useLoaderData
} from 'react-router-dom';

import { Profile } from '../services/profiles-service';

import classes from './matches-page.module.css';
import ProfileCard from '../components/profile-card';
import ProfilesList from '../components/profiles-list';

const MatchesPage = () => {
    const profiles = useLoaderData() as Profile[];

    const content = profiles.length === 0 ? (
        <h2>No matches profiles</h2>
    ) : ( 
        <ProfilesList profiles={profiles} />
    )

    return (
        <article className={classes.container}>
            { content }
        </article>
    );
};

export default MatchesPage;