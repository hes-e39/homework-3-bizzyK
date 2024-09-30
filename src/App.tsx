import { useState } from 'react';
import colors from './colors.json'; // Import colors from colors.json

// Define the type for the color object
interface Color {
    hex: string;
    name: string;
}

const App = () => {
    const [selectedColor, setSelectedColor] = useState<Color | null>(null);

    const handleClick = (color: Color) => {
        setSelectedColor(color); // Set the selected color to show in the modal
    };

    const closeModal = () => {
        setSelectedColor(null); // Close the modal by clearing the selected color
    };

    return (
        <div>
            <h1 className="text-white text-center mb-5">Colors</h1>
            <div className="flex flex-wrap justify-center">
                {colors.map((color: Color, index: number) => (
                    <div
                        key={index}
                        className="m-2 w-24 h-24 flex items-center justify-center rounded blur-effect cursor-pointer"
                        style={{ backgroundColor: `#${color.hex}` }}
                        onClick={() => handleClick(color)}
                    >
                        <p className="text-white text-center text-shadow">{color.name}</p>
                    </div>
                ))}
            </div>

            {/* Modal for displaying selected color details */}
            {selectedColor && (
                <div
                    className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
                    onClick={closeModal}
                >
                    <div
                        className="flex flex-col justify-center items-center bg-white p-8 rounded-lg shadow-lg"
                        style={{ backgroundColor: `#${selectedColor.hex}`, width: '300px', height: '300px' }}
                    >
                        <h2 className="text-white text-3xl text-shadow mb-2">{selectedColor.name}</h2>
                        <p className="text-white text-lg text-shadow">Hex: #{selectedColor.hex}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;