import { useState } from 'react';
import colors from './colors.json'; // Import colors from colors.json
import './index.css'; // Import the CSS file

// Define the type for the complementary color object
interface ComplementaryColor {
    hex: string;
    name: string;
}

// Define the type for the color object
interface Color {
    hex: string;
    name: string;
    comp?: ComplementaryColor[]; // Complementary colors are optional
}

// Helper function to determine if a color is "black"
const isBlackColor = (hex: string): boolean => hex === "000000"; // Pure black

const ColorCard = ({ color }: { color: Color }) => {
    const [hoveredCompHex, setHoveredCompHex] = useState<string | null>(null); // Track hovered complementary color
    const [copied, setCopied] = useState<string | null>(null); // Track copied hex value

    const handleMouseEnter = (hex: string) => setHoveredCompHex(hex); // Set hovered hex
    const handleMouseLeave = () => setHoveredCompHex(null); // Clear hovered hex
    const copyToClipboard = (hex: string) => {
        navigator.clipboard.writeText(hex).then(() => { // Copy without leading `#`
            setCopied(hex);
            setTimeout(() => setCopied(null), 1500); // Clear copied status after 1.5 seconds
        });
    };

    const textColor = isBlackColor(color.hex) ? '#828282' : '#242424'; // White text for black cards

    return (
        <div
            className="m-4 p-4 rounded-lg cursor-pointer flex flex-col justify-center items-center"
            style={{
                backgroundColor: `#${color.hex}`,
                width: '250px',
                height: '175px', // Adjusted height to be shorter
                color: textColor, // Set the text color dynamically
                borderColor: textColor, // Set border to match text color
            }}
            onClick={() => copyToClipboard(color.hex)} // Copy main hex value when the card is clicked
        >
            {/* Main color name */}
            <h2 className="text-2xl text-center mb-2">
                {color.name}
            </h2>

            {/* Display complementary colors if available */}
            {color.comp && (
                <div className="flex justify-center mt-4">
                    {color.comp.slice(0, 3).map((compColor, index) => (
                        <div
                            key={index}
                            className="m-1 w-10 h-10 flex items-center justify-center rounded cursor-pointer relative"
                            style={{
                                backgroundColor: `#${compColor.hex}`,
                                border: `1px dashed ${textColor}`, // Border matches text color
                            }}
                            onMouseEnter={() => handleMouseEnter(compColor.hex)}
                            onMouseLeave={handleMouseLeave}
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent the main card's click handler from firing
                                copyToClipboard(compColor.hex); // Copy complementary color's hex value
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Display the main or hovered complementary color hex at the bottom */}
            <p className="mt-4 text-sm text-center">
                #{hoveredCompHex ? hoveredCompHex : color.hex}
            </p>

            {/* Show "Copied!" message when hex is copied */}
            {copied && (
                <p className="text-sm text-center mt-2">
                    Copied: #{copied}
                </p>
            )}
        </div>
    );
};

const App = () => {
    return (
        <div className="flex flex-wrap justify-center p-4">
            {colors.map((color: Color, index: number) => (
                <ColorCard key={index} color={color} />
            ))}
        </div>
    );
};

export default App;