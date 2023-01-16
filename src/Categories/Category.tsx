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
            <Navbar />
            <div className="flex flex-col items-center  py-8">
                <div id="category">
                    <img className="rounded-md" src={category?.icons?.[0]?.url} alt="" />
                    <h1 className="text-center text-3xl py-4">{category?.name}</h1>
                </div>
            </div>
            <Carousel categoryId={params.categoryId} options={options} />
            <div className="flex flex-col items-center py-12">
                <button className="text-white hover:bg-spotifyGreen font-semibold hover:text-black py-2 px-5 border border-spotifyGreen hover:border-transparent rounded">
                    Start the game
                </button>
            </div>
        </div>
    );
};
export default Category;
