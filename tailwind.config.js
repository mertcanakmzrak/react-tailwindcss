/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        darkblue:'#34495E',
        purple:'#9B59B6',
        textcolor:'#34495E',
        hover:'#8E44AD',
        commentcolor:'#5D6D7E',
        line:'#EAECEE',
        datecolor:'#99A4AE',
        cancelbutton:'#C1C8CE'
      },
      fontFamily:{
        roboto :['Roboto' , 'sans-serif']
      },
      dropShadow: {
        'shadow': '0 3px 6px #8E44AD29',
        'hovershadow': '0 3px 6px #8E44AD8F',
       
      }
    },
  },
  plugins: [],
}

