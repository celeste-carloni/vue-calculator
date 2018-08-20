https://www.jerriepelser.com/blog/using-tailwindcss-with-vuejs/

module.exports = {
  "plugins": [
    require('postcss-import')(),
    require('tailwindcss')('./tailwind-config.js'),
    require('autoprefixer')(),
  ]
}
