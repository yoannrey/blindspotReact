import { useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function Categories() {
    const cacheAccessToken = localStorage.getItem('accessToken');
    const [isCacheEmpty, setIsCacheEmpty] = useState(
        () => !localStorage.getItem('accessToken'),
    );
    const redirectToLogin = () => {
        localStorage.clear();
        setIsCacheEmpty(true);
    };
    if (isCacheEmpty) return <Navigate replace to="/login" />;
    // Retrieve some Spotify categories using API
    return (
        <div>
            <p>{cacheAccessToken}</p>
            <button onClick={redirectToLogin}>Empty Cache</button>
        </div>
    );
}
