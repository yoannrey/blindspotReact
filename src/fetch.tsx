import { useEffect, useState } from 'react';

type FetchInfo = {
    data: any;
    isLoading?: boolean;
    error?: string | null;
};

export const useFetch = (url: string, options: any): FetchInfo => {
    const [data, setData] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setError(null);
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
