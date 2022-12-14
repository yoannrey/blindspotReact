import { useEffect, useState } from 'react';

type FetchInfo = {
    data: string;
    isLoading?: boolean;
    error?: string | null;
};

export const useFetch = (url: string, options: any): FetchInfo => {
    const [data, setData] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                setError(null);
                const res = await fetch(url, options);
                const data = await res.json();
                setData(data);
            } catch (e: any) {
                setError(e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData().then(() => console.log('OK'));
    }, []);
    return { data, isLoading, error };
};
