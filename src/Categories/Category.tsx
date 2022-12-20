import { useParams } from 'react-router-dom';

export default function Category() {
    const params = useParams();
    console.log(params.categoryId);
    return <div>CATEGORY</div>;
}
