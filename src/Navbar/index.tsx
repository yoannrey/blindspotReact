import { ArrowSmallLeftIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useIsCacheEmpty } from '../../resources/utils/cache';

const LOGIN = '/login';

type NavBarProps = {
    backTo: string;
};

const Navbar: FC<NavBarProps> = ({ backTo }) => {
    const navigate = useNavigate();
    const clearCacheAndRedirect = useIsCacheEmpty();
    const backToPreviousPage = (): void => {
        navigate(backTo);
    };


    return (
        <div className="md:container md:mx-auto py-4">
            <button
                onClick={backTo === LOGIN ? clearCacheAndRedirect : backToPreviousPage}
            >
                {backTo === LOGIN ? (
                    <ArrowLeftOnRectangleIcon className="h-8 w-8 text-white" />
                ) : (
                    <ArrowSmallLeftIcon className="h-6 w-6 text-white" />
                )}
            </button>
        </div>
    );
};

export default Navbar;
