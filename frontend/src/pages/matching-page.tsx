import React, {
    useState,
    useEffect,
    useRef
} from 'react';
import {
    useLoaderData,
    Form,
    useSubmit,
    useActionData,
} from 'react-router-dom';
import {
    Alert
} from '@mui/material';

import classes from './matching-page.module.css';
import ProfilesService, {
    Profile
} from '../services/profiles-service';
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
    const [error, setError] = useState<Error | null>(null);
    const profilesFromAction = useActionData() as Profile[];
    const [profiles, setProfiles] = useState<Profile[]>(useLoaderData() as Profile[]);
    const submit = useSubmit();
    const ref = useRef<HTMLFormElement>(null); 

    useEffect(() => {
        if (profilesFromAction && profilesFromAction.length > 0) {
            setProfiles(profilesFromAction as Profile[]);
        }
    }, [profilesFromAction]);

    useEffect(() => {
        if (error) {
            setTimeout(() => setError(null), 3000);
        }
    }, [error]);

    const handleStopSwiping = async () => {
        const accepted = stopSwiping();
        if (accepted === undefined) {
            return;
        }

        try {
            await ProfilesService.swipeProfile(profiles[0].id, accepted);
            if (profiles.length === 1) {
                submit(ref.current);
            } else {
                setProfiles(profiles.slice(1));
            }
        } catch (error) {
            setError(error);
        }
    };

    const content = profiles.length === 0 ? (
        <section className={classes.profile}>
            <h2>No more profiles</h2>
        </section>
    ) : (
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
                <Form method="POST" ref={ref} />
        </section>
    )

    return (
        <article className={classes.container}>
            {content}
            {error && <Alert severity='error'>{error.message}</Alert>}
        </article>
    );
};

export default MatchingPage;