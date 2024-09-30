import colors from './colors.json'; // Import colors from colors.json

const App = () => {
    return (
        <div>
            <h1>Colors</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {colors.map((color, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: `#${color.hex}`,
                            color: '#fff',
                            margin: '10px',
                            padding: '10px',
                            borderRadius: '5px',
                            width: '150px',  // Fixed width
                            height: '150px',  // Fixed height
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <p>{color.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;