module.exports = {
    content: [
      './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            600: '#2563eb',
            700: '#1d4ed8',
          },
        },
      },
    },
    plugins: [
    //   require('@tailwindcss/forms'),
    //   require('@tailwindcss/typography'),
    ],
  };