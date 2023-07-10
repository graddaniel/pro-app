import React, {
    useState,
    useEffect,
    useRef,
    useCallback
} from 'react';
import {
    useLoaderData,
    Form,
    useSubmit,
    useActionData,
    useNavigate
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

import ROUTES from '../consts/routes';

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
    const [swipeResults, setSwipeResults] = useState<Array<{profileId: number, accepted: boolean}>>([]);
    const form = useRef<HTMLFormElement>(null); 
    const submit = useSubmit();

    useEffect(() => {
        setProfileIndex(0);
        setSwipeResults([]);
    }, [profiles]);

    useEffect(() => {
        if (profileIndex === profiles.length) {
            submit(form.current);
        }
    }, [profileIndex, submit]);

    const handleFinishedSwiping = useCallback(() => {
        const accepted = stopSwiping();
        if (accepted === undefined) {
            return;
        }

        setSwipeResults(swipeResults => [...swipeResults, { profileId: profiles[profileIndex].id, accepted }]);
        setProfileIndex(profileIndex => profileIndex + 1);
    },[stopSwiping]);

    const formContent = swipeResults.map((result) => {
        const { profileId, accepted } = result;

        return (
            <div key={profileId}>
                <input type="hidden" name="profileId[]" value={profileId} />
                <input type="hidden" name="accepted[]" value={accepted ? 'true' : 'false'} />
            </div>
        );
    });

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
                { profiles.length > profileIndex && <ProfileCard profile={profiles[profileIndex]} /> }
                <Form method="POST" ref={form}>
                    {formContent}
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