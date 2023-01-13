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
                        className={`relative block w-full leading-5 text-center font-medium text-white transition duration-150 ease-in-out ${
                            selectedIndex === index ? '' : 'hidden'
                        } flex items-center justify-center`}
                    >
                        {option}
                    </div>
                ))}
            </div>
            <div className="relative inset-x-0 bottom-0 flex justify-between px-2 py-3">
                <button
                    className="text-sm font-medium leading-5 transition duration-150 ease-in-out"
                    onClick={handlePrevious}
                >
                    Précédent
                </button>
                <button
                    className="text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none focus:underline"
                    onClick={handleNext}
                >
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default Carousel;
