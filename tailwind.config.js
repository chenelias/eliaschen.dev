/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                ibm: ["'IBM Plex Sans'", 'sans-serif'],
                mplus: ["'M PLUS Rounded 1c'", 'sans-serif'],
                code: ["'Space Mono', 'monospace'"],
            },
            screens: {
                xs: '540px',
                minxs: '430px',
            },
        },
    },
    plugins: [],
}
