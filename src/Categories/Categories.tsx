import { useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

import { useFetch } from '../fetch';

type Categories = {
    href: string;
    items: Item[];
    limit: number;
    next: string;
    offset: number;
};

type Item = {
    id?: string;
    name?: string;
    icons: Icon[];
};

type Icon = {
    height: string | null;
    width: string | null;
    url: string;
};
export default function Categories() {
    // Check if cache exist => if not return to login page
    const [isCacheEmpty, setIsCacheEmpty] = useState(
        () => !localStorage.getItem('accessToken'),
    );
    const navigate = useNavigate();
    // Set options on fetch
    const { data, isLoading, error } = useFetch(
        'https://api.spotify.com/v1/browse/categories?limit=50',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${localStorage.getItem(
                    'tokenType',
                )} ${localStorage.getItem('accessToken')}`,
            },
        },
    );

    const navigateToCategory = (categoryId: string | undefined) => {
        navigate(`/categories/${categoryId}`);
    };
    // TODO: Change this function for a disconnect one.
    const redirectToLogin = () => {
        localStorage.clear();
        setIsCacheEmpty(true);
    };
    if (isCacheEmpty || error) return <Navigate replace to="/login" />;
    if (isLoading) return <p>Loading...</p>;
    const categories: Categories = data.categories;
    // Retrieve some Spotify categories using API
    return (
        <div className="bg-spotifyBlack text-white">
            <div>
                <div className="container mx-auto">
                    <h1 className="text-white font-semibold justify-center mb-10">
                        Catégories
                    </h1>
                    <div
                        role="button"
                        className="grid grid-cols-4 place-items-center justify-center align-items"
                    >
                        {categories.items.map((item) => (
                            <button
                                key={item.id}
                                className="card"
                                onClick={() => navigateToCategory(item.id)}
                            >
                                <img
                                    className="w-[274px] h-[274px] hover:scale-105 rounded-md"
                                    src={item?.icons[0].url}
                                    alt=""
                                />
                                <p className="text-center" key={item.id}>
                                    {item.name}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <button
                className="text-black flex hover:bg-spotifyGreen font-semibold py-2 px-5 border border-spotifyGreen hover:border-transparent rounded"
                onClick={redirectToLogin}
            >
                Empty Cache
            </button>
            <Outlet />
        </div>
    );
}
