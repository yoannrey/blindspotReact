import { useEffect, useState } from 'react';

import { ACCESS_TOKEN_PATH } from './localStorageHandler';

const url = import.meta.env.VITE_APP_API_URL;
const options: RequestInit = {
    method: 'GET',
};

type FetchInfo<T> = {
    data: T | null;
    isLoading?: boolean;
    error?: string | null;
};

const getAuthHeaders = () => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set(
        'Authorization',
        `${localStorage.getItem('tokenType')} ${localStorage.getItem(ACCESS_TOKEN_PATH)}`,
    );
    return requestHeaders;
};

export const useFetch = <T>(pathApi: string): FetchInfo<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setError(null);
                options.headers = getAuthHeaders();
                const res = await fetch(url + pathApi, options);
                console.log(url + pathApi);
                if (res.status === 401) localStorage.clear();
                const data = await res.json();
                setData(data);
            } catch (e: unknown) {
                if (e instanceof Error) setError(e.message);
            }
        };
        fetchData().then(() => console.log('Fetching data ok'));
    }, []);
    return { data, isLoading: !data && !error, error };
};
