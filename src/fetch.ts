import { useEffect, useState } from 'react';

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
        `${localStorage.getItem('tokenType')} ${localStorage.getItem('accessToken')}`,
    );
    return requestHeaders;
};

export const useFetch = <T>(url: string, options: RequestInit): FetchInfo<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setError(null);
                options.headers = setAuthHeaders();
                const res = await fetch(url, options);
                if (res.status === 401) localStorage.clear();
                const data = await res.json();
                setData(data);
            } catch (e: any) {
                setError(e);
            }
        };
        fetchData().then(() => console.log('Fetching data ok'));
    }, []);
    return { data, isLoading: !data && !error, error };
};
