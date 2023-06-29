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
import {
    Profile
} from '../services/profiles-service';
import ProfileCard from '../components/profile-card';

import useSwipe from '../hooks/useSwipe';

const createInput = (name: string, value: string) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    return input;
};

const MatchingPage = () => {
    const {
        swipeXOffset,
        profileElement,
        startSwiping,
        stopSwiping,
        handleMouseMove
    } = useSwipe();
    const error = useActionData() as Error | undefined;
    const profiles = useLoaderData() as Profile[];
    const [profileIndex, setProfileIndex] = useState(0);
    const submit = useSubmit();
    const form = useRef<HTMLFormElement>(null); 

    useEffect(() => {
        if (form.current === null) {
            return;
        }

        form.current.innerHTML = '';
    }, [profiles]);

    const handleFinishedSwiping = () => {
        const accepted = stopSwiping();
        if (accepted === undefined) {
            return;
        }
        if (form.current === null) {
            console.log('form not found');
            return;
        }

        const profileId = profiles[profileIndex].id;
        const profileIdInput = createInput('profileId[]', profileId.toString());
        const acceptedInput = createInput('accepted[]', accepted ? 'true' : 'false');

        setProfileIndex(profileIndex + 1);
        form.current.appendChild(profileIdInput);
        form.current.appendChild(acceptedInput);

        if (profiles.length === profileIndex + 1) {
            setProfileIndex(0);
            submit(form.current)
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
            onMouseMove={handleMouseMove}
            onMouseUp={handleFinishedSwiping}
            onMouseOut={handleFinishedSwiping}
        >
                <ProfileCard profile={profiles[profileIndex]} />
                <Form method="POST" ref={form}>
                </Form>
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