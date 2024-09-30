import colors from './colors.json';

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
                            padding: '20px',
                            borderRadius: '5px',
                            width: '150px',
                            textAlign: 'center',
                        }}
                    >
                        <p>{color.name}</p>
                        <p>#{color.hex}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
