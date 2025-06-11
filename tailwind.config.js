/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{ts,tsx}",    // App Router
        "./components/**/*.{ts,tsx}", // si tu utilises des composants
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
