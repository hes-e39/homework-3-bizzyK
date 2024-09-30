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

// Helper function to determine if a color is "light" (close to white)
const isLightColor = (hex: string): boolean => {
    const r = Number.parseInt(hex.substring(0, 2), 16);
    const g = Number.parseInt(hex.substring(2, 4), 16);
    const b = Number.parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 200; // Adjust threshold for "lightness"
};

// Helper function to determine if a color is "black"
const isDarkColor = (hex: string): boolean => {
    return hex === "000000"; // Pure black
};

// Helper function to determine if a color is "white"
const isWhiteColor = (hex: string): boolean => {
    return hex === "FFFFFF"; // Pure white
};

const ColorCard = ({ color }: { color: Color }) => {
    const [hoveredCompHex, setHoveredCompHex] = useState<string | null>(null); // Track hovered complementary color
    const [copied, setCopied] = useState<string | null>(null); // Track copied hex value

    const handleMouseEnter = (hex: string) => {
        setHoveredCompHex(hex); // Set the hex of the hovered complementary color
    };

    const handleMouseLeave = () => {
        setHoveredCompHex(null); // Clear the hovered hex when mouse leaves
    };

    const copyToClipboard = (hex: string) => {
        navigator.clipboard.writeText(hex).then(() => { // No leading `#`
            setCopied(hex); // Set the copied hex value
            setTimeout(() => setCopied(null), 1500); // Clear "copied" status after 1.5 seconds
        });
    };

    // Determine the appropriate class for text shadow based on color
    const textShadowClass = isWhiteColor(color.hex)
        ? 'dark-shadow'  // Strong dark shadow for white cards
        : isDarkColor(color.hex)
            ? 'light-shadow'  // Strong light shadow for black cards
            : 'default-shadow'; // Default shadow for all other colors

    return (
        <div
            className="m-4 p-4 rounded-lg shadow-lg cursor-pointer flex flex-col justify-center items-center"
            style={{
                backgroundColor: `#${color.hex}`,
                width: '250px',
                height: '175px', // Adjusted height to be shorter
                color: isLightColor(color.hex) ? '#000000' : '#FFFFFF', // Set text color dynamically
            }}
            onClick={() => copyToClipboard(color.hex)} // Copy main hex value when the card is clicked
        >
            {/* Main color name */}
            <h2 className={`text-2xl text-center mb-2 ${textShadowClass}`}>
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
                                border: `1px dashed ${isLightColor(compColor.hex) ? '#000000' : '#FFFFFF'}`, // White border except for light colors
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
            <p className={`mt-4 text-sm text-center ${textShadowClass}`}>
                #{hoveredCompHex ? hoveredCompHex : color.hex}
            </p>

            {/* Show "Copied!" message when hex is copied */}
            {copied && (
                <p className={`text-sm text-center mt-2 ${textShadowClass}`}>
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