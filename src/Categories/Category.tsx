import { PlayIcon } from '@heroicons/react/24/solid';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { CategoryType } from '../../resources/types/category';
import { useFetch } from '../../resources/utils/fetch';
import Carousel from '../Carousel/index';
import Navbar from '../Navbar';

const options: string[] = ['Facile', 'Moyen', 'Difficile'];
const Category: FC = () => {
    const params = useParams();
    const {
        data: category,
        isLoading,
        error,
    } = useFetch<CategoryType>(`/browse/categories/${params.categoryId}`);
    if (isLoading) return <div>Loading</div>;
    if (error) return <div>error</div>;
    return (
        <div className="bg-spotifyBlack text-white h-screen">
            <Navbar backTo="/categories" />
            <div className="flex flex-col items-center  py-8">
                <div id="category">
                    <img className="rounded-md" src={category?.icons?.[0]?.url} alt="" />
                    <h1 className="text-center text-3xl py-4">{category?.name}</h1>
                </div>
            </div>
            <Carousel options={options} />
            <div className="flex flex-col items-center py-12">
                <button className="text-white flex flex-col hover:scale-102 transition-colors hover:bg-spotifyGreen font-semibold hover:text-black py-2 px-5 items-center hover:border-transparent rounded w-1/6">
                    <PlayIcon className="h-8 w-10" />
                </button>
            </div>
        </div>
    );
};
export default Category;
