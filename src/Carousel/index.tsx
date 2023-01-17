import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { FC, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { classNames } from '../../resources/utils/classNames';

type CategoryParam = {
    options: string[];
};

const Carousel: FC<CategoryParam> = ({ options }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState<number | null>(null);

    // Previous button
    const handlePrevious = () => {
        setPrevIndex(selectedIndex);
        setSelectedIndex(selectedIndex === 0 ? options.length - 1 : selectedIndex - 1);
    };
    // Next button
    const handleNext = () => {
        setPrevIndex(selectedIndex);
        setSelectedIndex(selectedIndex === options.length - 1 ? 0 : selectedIndex + 1);
    };

    return (
        <div className="relative overflow-hidden">
            <div className="relative">
                {options.map((option, index) => (
                    <CSSTransition
                        key={index}
                        in={selectedIndex === index}
                        timeout={300}
                        classNames={
                            prevIndex === index + 1
                                ? 'slide-prev'
                                : prevIndex === index - 1
                                ? 'slide-next'
                                : 'slide-current'
                        }
                        unmountOnExit
                    >
                        <div
                            key={option}
                            className={classNames(
                                'relative block leading-5 text-center text-4xl text-white flex items-center justify-center',
                                selectedIndex === index ? 'selected' : 'hidden',
                            )}
                        >
                            {option}
                        </div>
                    </CSSTransition>
                ))}
            </div>
            <div className="relative inset-x-0 bottom-8 flex justify-between px-[35em] py-3">
                <button
                    className="text-md font-medium leading-5 hover:scale-150 transition duration-150 ease-in-out"
                    onClick={handlePrevious}
                    disabled={selectedIndex === 0}
                >
                    <ChevronLeftIcon className="h-6 w-6 text-white" />
                </button>
                <button
                    className="text-md font-medium leading-5 transition duration-150 hover:scale-150 ease-in-out"
                    onClick={handleNext}
                    disabled={selectedIndex === 2}
                >
                    <ChevronRightIcon className="h-6 w-6 text-white" />
                </button>
            </div>
        </div>
    );
};

export default Carousel;
