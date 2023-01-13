import { FC, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { CSSTransition } from 'react-transition-group';

import { classNames } from '../../resources/utils/classNames';
const Carousel: FC = () => {
    const options = ['Facile', 'Moyen', 'Difficile'];
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
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
                        id={index}
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
                    className="text-md font-medium leading-5 transition duration-150 ease-in-out"
                    onClick={handlePrevious}
                    disabled={selectedIndex === 0}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 hover:scale-150"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                </button>
                <button
                    className="text-md font-medium leading-5 transition duration-150 ease-in-out"
                    onClick={handleNext}
                    disabled={selectedIndex === 2}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 hover:scale-150"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Carousel;
