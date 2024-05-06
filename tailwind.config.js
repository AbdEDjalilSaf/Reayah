/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                green: "#32DEBF",
                green_b: "#0D8872",
                perpol: "#9747FF",
                perpol_b: "#7C2CBF",
                black_text: "#1f1f1f",
                gray: "#525252",
                gray_white: "#e6e6e6",
                
            },
        },
    },
    plugins: [],
};
