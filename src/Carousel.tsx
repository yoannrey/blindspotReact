import { FC, useState } from 'react';

const Carousel: FC = () => {
    const options = ['Facile', 'Moyen', 'Difficile'];
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handlePrevious = () => {
        setSelectedIndex(selectedIndex === 0 ? options.length - 1 : selectedIndex - 1);
    };

    const handleNext = () => {
        setSelectedIndex(selectedIndex === options.length - 1 ? 0 : selectedIndex + 1);
    };

    return (
        <div className="relative overflow-hidden">
            <div className="relative">
                {options.map((option, index) => (
                    <div
                        key={option}
                        className={`relative block w-full leading-5 text-center text-3xl font-medium text-white transition duration-150 ease-in-out ${
                            selectedIndex === index ? '' : 'hidden'
                        } flex items-center justify-center`}
                    >
                        {option}
                    </div>
                ))}
            </div>
            <div className="relative inset-x-0 bottom-8 flex justify-between px-[35em] py-3">
                <button
                    className="text-md font-medium leading-5 transition duration-150 ease-in-out"
                    onClick={handlePrevious}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
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
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
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
