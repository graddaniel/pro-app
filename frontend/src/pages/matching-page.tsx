import React, {
    useState,
    useCallback,
    useRef,
} from 'react';
import type { MouseEvent } from 'react';
import { useLoaderData } from 'react-router-dom';

import classes from './matching-page.module.css';
import { Profile } from '../services/profiles-service';
import ProfileCard from '../components/profile-card';


const MatchingPage = () => {
    const [swiping, setSwiping] = useState(false);
    const [swipeStartXCoord, setSwipeStartXCoord] = useState(0);
    const [swipeXOffset, setSwipeXOffset] = useState(0);
    const profileElement = useRef<HTMLElement>(null);
    const profiles = useLoaderData() as Profile[];

    const startSwiping = useCallback((event: MouseEvent) => {
        setSwiping(true);
        setSwipeStartXCoord(event.clientX)
    }, []);

    const stopSwiping = useCallback(() => {
        if (!profileElement.current) {
            console.log("No element found")
            return;
        }

        const elementsWidth = profileElement.current.clientWidth;
        console.log(elementsWidth, elementsWidth/2, swipeXOffset)
        if (Math.abs(swipeXOffset) > elementsWidth / 2) {
            console.log("swiped")
        } else {
            console.log("not swiped")
        }
        
        setSwiping(false);
        setSwipeXOffset(0);
    }, [swipeXOffset]);

    const handleMouseMove = useCallback((event: MouseEvent) => {
        if (swiping) {
            const mouseXPosition = event.clientX;
            
            setSwipeXOffset(mouseXPosition - swipeStartXCoord);
        }
    }, [swiping]);

    return (
        <article className={classes.container}>
            MATCHING
            <section
                style={{
                    left: `${swipeXOffset}px`,
                }}
                ref={profileElement}
                className={classes.profile}
                onMouseDown={startSwiping}
                onMouseUp={stopSwiping}
                onMouseMove={handleMouseMove}
                onMouseOut={stopSwiping}
            >
                <ProfileCard profile={profiles[0]} />
            </section>
        </article>
    );
};

export default MatchingPage;