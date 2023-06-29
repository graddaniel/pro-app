import {
    useState,
    useCallback,
    useRef,
} from 'react';
import type { MouseEvent } from 'react';

const useSwipe = () => {
    const [swiping, setSwiping] = useState(false);
    const [swipeStartXCoord, setSwipeStartXCoord] = useState(0);
    const [swipeXOffset, setSwipeXOffset] = useState(0);
    const profileElement = useRef<HTMLElement>(null);

    const startSwiping = useCallback((event: MouseEvent) => {
        setSwiping(true);
        setSwipeStartXCoord(event.clientX)
    }, []);

    const stopSwiping = useCallback(() => {
        setSwiping(false);
        setSwipeXOffset(0);

        if (!profileElement.current) {
            console.log("No element found")
        }

        if (Math.abs(swipeXOffset) > 100) {
            return Math.sign(swipeXOffset) === 1;
        } 
    },[swipeXOffset]);
    

    const handleMouseMove = useCallback((event: MouseEvent) => {
        if (swiping) {
            const mouseXPosition = event.clientX;
            
            setSwipeXOffset(mouseXPosition - swipeStartXCoord);
        }
    }, [swiping]);

    return {
        swipeXOffset,
        profileElement,
        startSwiping,
        stopSwiping,
        handleMouseMove
    };
}

export default useSwipe;