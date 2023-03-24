import { FC } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';

import { Icon } from '../../resources/types/icon';
import { useIsCacheEmpty } from '../../resources/utils/cache';
import { useFetch } from '../../resources/utils/fetch';
import Navbar from '../Navbar';

const routes = {
    category: (categoryId: string | undefined) => `/categories/${categoryId}`,
};

type Categories = {
    categories: {
        href: string;
        items: Item[];
        limit: number;
        next: string;
        offset: number;
    };
};

type Item = {
    id: string;
    name: string;
    icons: Icon[];
};

const Categories: FC = () => {
    // Check if cache exist => if not return to login page
    const clearCacheAndRedirect = useIsCacheEmpty();

    // Set options on fetch
    const {
        data: data,
        isLoading,
        error,
    } = useFetch<Categories>('/browse/categories?limit=50');
    // TODO: Change this function for a disconnect one.
    if (error) return <Navigate replace to="/login" />;
    if (isLoading) return <p>Loading...</p>;
    const categories = data?.categories;
    // Retrieve some Spotify categories using API
    return (
        <div className="bg-spotifyBlack text-white">
            <Navbar backTo="/login" />
            <div className="container mx-auto">
                <div
                    role="button"
                    className="grid grid-cols-4 place-items-center justify-center align-items"
                >
                    {categories &&
                        categories.items.map((item) => (
                            <Link
                                key={item.id}
                                className="card"
                                to={routes.category(item.id)}
                            >
                                <img
                                    className="w-[274px] h-[274px] hover:scale-105 rounded-md"
                                    src={item?.icons[0].url}
                                    alt=""
                                />
                                <p className="text-center" key={item.id}>
                                    {item.name}
                                </p>
                            </Link>
                        ))}
                </div>
            </div>
            <button
                className="text-black flex hover:bg-spotifyGreen font-semibold py-2 px-5 border border-spotifyGreen hover:border-transparent rounded"
                onClick={clearCacheAndRedirect}
            >
                Empty Cache
            </button>
            <Outlet />
        </div>
    );
};

export default Categories;
