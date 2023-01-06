import { FC } from 'react';
import { useParams } from 'react-router-dom';

const Category: FC = () => {
    const params = useParams();
    console.log(params.categoryId);
    return <div>CATEGORY</div>;
};
export default Category;
