module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                satisfy: ['"Satisfy"', 'cursive'],
                lato: ['"Lato"', 'sans-serif'],
            },
            colors: {
                primary: '#FFF8E1',
                secondary: '#F08A5D',
                tertiary: '#B83B5E',
                quaternary: '#6A2C70',
            },
        },
    },
    plugins: [],
};
