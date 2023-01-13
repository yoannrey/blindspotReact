import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { CategoryType } from '../../resources/types/category';
import Carousel from '../Carousel';
import { useFetch } from '../fetch';

const Category: FC = () => {
    const params = useParams();
    const url = import.meta.env.VITE_APP_API_URL;
    const {
        data: category,
        isLoading,
        error,
    } = useFetch<CategoryType>(`${url}/browse/categories/${params.categoryId}`, {
        method: 'GET',
    });
    if (isLoading) return <div>Loading</div>;
    if (error) return <div>error</div>;
    console.log(category?.name);
    return (
        <div className="bg-spotifyBlack text-white h-screen">
            <div className="flex flex-col items-center  py-8">
                <div id="category">
                    <img className="rounded-md" src={category?.icons[0].url} alt="" />
                    <h1 className="text-center text-3xl py-4">{category?.name}</h1>
                </div>
            </div>
            <Carousel />
        </div>
    );
};
export default Category;
