import './App.css';

import {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';

import {useFetch} from './fetch';

type PostApi = {
    age?: number;
    count?: number;
    name?: string;
};
// https://developer.spotify.com/dashboard/oauth_callback#access_token=BQCuvFkSivW36TZ5JWFrEkN1f0kgCyWlWGbTzEYSHtUU7vw9MuCfQe1jzk_eQXvGB1l2A6721KOjduFMHVTiDwnS_mmGDsWZux8OATz1S8LCrmYDs6czKILTy5Cyu-oRD82eUmYJM1O-p3ptA4Q9htMLNgxDCsYJmSalgiE1-7p9rif1FdnWcl9PrhU&token_type=Bearer&expires_in=3600
export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        () => !!localStorage.getItem('accessToken'),
    );
    const spotifyConfig = {
        clientId: import.meta.env.VITE_APP_CLIENT_ID,
        authorizationEndPoint: import.meta.env.VITE_APP_SPOTIFY_AUTHORIZATION_ENDPOINT,
        redirectURL: import.meta.env.VITE_APP_REDIRECT_URL_AFTER_LOGIN,
        appScopes: import.meta.env.VITE_APP_SCOPES.replace(',', '%20'),
    };
    const getReturnedValue = (hash: string) => {
        const stringAfterHashtag = hash.substring(1);
        const paramsInUrl = stringAfterHashtag.split('&');
        return paramsInUrl.reduce((accumulater: string, currentValue: string) => {
            const [key, value] = currentValue.split('=');
            accumulater[key] = value;
            return accumulater;
        }, {});
    };
    const res = useFetch('https://api.agify.io/?name=michael', {});
    useEffect(() => {
        if (window.location.hash) {
            const { access_token, expires_in, token_type } = getReturnedValue(
                window.location.hash,
            );
            localStorage.clear();
            localStorage.setItem('accessToken', access_token);
            localStorage.setItem('tokenType', token_type);
            localStorage.setItem('expiresIn', expires_in);
            setIsLoggedIn(true);
            return () => {
                setIsLoggedIn(false);
            };
        }
    }, []);
    if (isLoggedIn) return <Navigate replace to="/categories" />;
    const handleLogin = () => {
        window.location.href = `${spotifyConfig.authorizationEndPoint}?client_id=${spotifyConfig.clientId}&redirect_uri=${spotifyConfig.redirectURL}&scope=${spotifyConfig.appScopes}&response_type=token&show_dialog=true&exipres_in=3600`;
    };
    if (res.isLoading)
        return <div className="flex flex-row bg-spotifyBlack">Loading...</div>;
    return (
        <div className="flex flex-row bg-spotifyBlack">
            <div className="container grow divide-x">
                <div className="grid place-items-center h-screen ">
                    <button
                        onClick={handleLogin}
                        className="text-white flex hover:bg-spotifyGreen font-semibold hover:text-black py-2 px-5 border border-spotifyGreen hover:border-transparent rounded"
                    >
                        Connexion avec Spotify
                        <svg
                            className="fill-white ml-10 mt-[6px]"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 2931 2931"
                            width="30"
                            height="30"
                        >
                            <path
                                className="st0"
                                d="M1465.5 0C656.1 0 0 656.1 0 1465.5S656.1 2931 1465.5 2931 2931 2274.9 2931 1465.5C2931 656.2 2274.9.1 1465.5 0zm672.1 2113.6c-26.3 43.2-82.6 56.7-125.6 30.4-344.1-210.3-777.3-257.8-1287.4-141.3-49.2 11.3-98.2-19.5-109.4-68.7-11.3-49.2 19.4-98.2 68.7-109.4C1242.1 1697.1 1721 1752 2107.3 1988c43 26.5 56.7 82.6 30.3 125.6zm179.3-398.9c-33.1 53.8-103.5 70.6-157.2 37.6-393.8-242.1-994.4-312.2-1460.3-170.8-60.4 18.3-124.2-15.8-142.6-76.1-18.2-60.4 15.9-124.1 76.2-142.5 532.2-161.5 1193.9-83.3 1646.2 194.7 53.8 33.1 70.8 103.4 37.7 157.1zm15.4-415.6c-472.4-280.5-1251.6-306.3-1702.6-169.5-72.4 22-149-18.9-170.9-91.3-21.9-72.4 18.9-149 91.4-171 517.7-157.1 1378.2-126.8 1922 196 65.1 38.7 86.5 122.8 47.9 187.8-38.5 65.2-122.8 86.7-187.8 48z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="container mx-auto py-[10%] text-white">
                <h1 className="text-6xl font-bold">Blindspot</h1>
                <p className="text-2xl">Blind test application using SPOTIFY API</p>
            </div>
        </div>
    );
}
