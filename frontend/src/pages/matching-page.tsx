import React, {
    useState,
} from 'react';

import { useLoaderData } from 'react-router-dom';

import classes from './matching-page.module.css';
import ProfilesService, { Profile } from '../services/profiles-service';
import ProfileCard from '../components/profile-card';

import useSwipe from '../hooks/useSwipe';


const MatchingPage = () => {
    const {
        swipeXOffset,
        profileElement,
        startSwiping,
        stopSwiping,
        handleMouseMove
    } = useSwipe();

    const [profiles, setProfiles] = useState<Profile[]>(useLoaderData() as Profile[]);

    const handleStopSwiping = async () => {
        const accepted = stopSwiping();
        if (accepted === undefined) {
            return;
        }

        try {
            await ProfilesService.swipeProfile(profiles[0].id, accepted);
            await loadNewProfile();
        } catch (error) {
            console.error(error);
        }
    }

    const loadNewProfile = async () => {
        if (profiles.length === 1) {
            const newProfiles = await ProfilesService.getProfiles() || [];
            setProfiles(newProfiles);
        } else {
            setProfiles((prevProfiles) => prevProfiles.slice(1));
        }
    }

    return (
        <article className={classes.container}>
            <section
                style={{
                    left: `${swipeXOffset}px`,
                }}
                ref={profileElement}
                className={classes.profile}
                onMouseDown={startSwiping}
                onMouseUp={handleStopSwiping}
                onMouseMove={handleMouseMove}
                onMouseOut={handleStopSwiping}
            >
                <ProfileCard profile={profiles[0]} />
            </section>
        </article>
    );
};

export default MatchingPage;