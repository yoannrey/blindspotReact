import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {useFetch} from "./fetch";

export default function Categories() {
    const cacheAccessToken = localStorage.getItem('accessToken');
    const [isCacheEmpty, setIsCacheEmpty] = useState(
        () => !localStorage.getItem('accessToken'),
    );
    const res = useFetch('https://api.spotify.com/v1/browse/categories', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${localStorage.getItem('tokenType')} ${localStorage.getItem(
                'accessToken',
            )}`,
        },
    });
    console.log(res.data);
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
