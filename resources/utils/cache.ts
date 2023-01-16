import { useEffect, useState } from 'react';
import { ACCESS_TOKEN_PATH } from './accessToken';

export const useIsCacheEmpty = () => {
    const [isCleared, setIsCleared] = useState(false);
    useEffect(() => {
        if (isCleared || !ACCESS_TOKEN_PATH) {
            localStorage.clear();
            sessionStorage.clear();
            window.location.replace('/login');
        }
    }, [isCleared]);
    return () => {
        setIsCleared(true);
    };
};
