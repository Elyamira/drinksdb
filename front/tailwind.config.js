const { transform } = require('framer-motion');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        screens: {
            ...defaultTheme.screens,
            sm: '660px',
        },
        extend: {
            fontFamily: {
                satisfy: ['"Satisfy"', 'cursive'],
                lato: ['"Lato"', 'sans-serif'],
                yellowTail: ['Yellowtail', 'cursive'],
            },
            colors: {
                primary: '#FFF8E1',
                secondary: '#F08A5D',
                tertiary: '#B83B5E',
                quaternary: '#6A2C70',
            },
            keyframes: {
                slideLeft: {
                    '0%': {
                        transform: 'translate3d(0, 0, 0)',
                    },
                    '100%': {
                        transform: 'translate3d(-100%, 0, 0)',
                    },
                },
                slideDown: {
                    '0%': {
                        opacity: 0,
                        transform: 'translateY(-60px)',
                    },
                    '100%': {
                        opacity: 1,
                        transform: 'translateY(0px)',
                    },
                },
                growDown: {
                    ' 0%': {
                        transform: 'scaleY(0)',
                    },
                    ' 100%': {
                        transform: 'scaleY(1)',
                    },
                },
                shrinkUp: {
                    ' 0%': {
                        transform: 'scaleY(1)',
                    },
                    ' 100%': {
                        transform: 'scaleY(0)',
                    },
                },
            },
            animation: {
                slideLeft: 'slideLeft 40s linear infinite',
                animateDash: 'animateDash 200s linear forwards infinite',
                animateGrowDown: 'growDown .2s linear forwards',
                animateShrinkUp: 'shrinkUp .2s linear forwards',
            },
        },
    },
    plugins: [],
};
