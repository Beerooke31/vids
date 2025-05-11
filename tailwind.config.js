module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./src/index.html", // explicitly include index.html
  ],
  safelist: ["text-gray-300"], // or any Tailwind class you're using only in index.html
  theme: {
    extend: {},
    fontFamily: {
      roboto: ["Roboto"],
    },
  },
  plugins: [],
};
