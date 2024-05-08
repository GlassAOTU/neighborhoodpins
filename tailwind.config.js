/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
    extend: {
      minHeight: {
        'screen-80': 'calc(100vh - 80px)',
      },
      colors: {
        'evergreen': '#125b49',
        'coach-green': '#003527',
        'teal-midnight': '#051914',
        'last-of-lettuce': '#aadd66',
        'white-asparagus': '#eceabe',
        'dipped-in-cream': '#fcf6eb',
      },
    },
	},
	plugins: [],
}
