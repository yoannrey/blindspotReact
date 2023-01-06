import { useEffect, useState } from 'react';

export const useIsCacheEmpty = () => {
    const [isCleared, setIsCleared] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (isCleared || !token) {
            localStorage.clear();
            sessionStorage.clear();
            window.location.replace('/login');
        }
    }, [isCleared]);
    return () => {
        setIsCleared(true);
    };
};
