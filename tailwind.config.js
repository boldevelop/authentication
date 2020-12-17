module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          default: '1rem',
          sm: '1rem',
          md: '1rem',
          lg: '2rem',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
