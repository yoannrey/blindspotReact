import { ArrowLeftOnRectangleIcon, ArrowSmallLeftIcon } from '@heroicons/react/24/solid';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useIsCacheEmpty } from '../../resources/utils/cache';

const LOGIN = '/login';

type NavBarProps = {
    backTo: string;
};

const Navbar: FC<NavBarProps> = ({ backTo }) => {
    const [stickyBar, setStickyBar] = useState('relative');
    const navigate = useNavigate();
    const clearCacheAndRedirect = useIsCacheEmpty();

    useEffect(() => {
        window.addEventListener('scroll', stickNavbar);
        return () => {
            window.removeEventListener('scroll', stickNavbar);
        };
    }, []);
    const stickNavbar = () => {
        if (window !== undefined) {
            const windowHeight = window.scrollY;
            windowHeight > 500
                ? setStickyBar('fixed top-8')
                : setStickyBar('fixed top-8');
        }
    };
    const backToPreviousPage = (): void => {
        navigate(backTo);
    };

    return (
        <div className={`${stickyBar}`}>
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
