/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['app.vue'],
	theme: {
		// screens: {
		// 	'2xl': { max: '1536px' },
		// 	// => @media (max-width: 1535px) { ... }

		// 	xl: { max: '1280px' },
		// 	// => @media (max-width: 1279px) { ... }

		// 	lg: { max: '1024px' },
		// 	// => @media (max-width: 1023px) { ... }

		// 	md: { max: '768px' },
		// 	// => @media (max-width: 767px) { ... }

		// 	sm: { max: '640px' },
		// 	// => @media (max-width: 639px) { ... }
		// },
		extend: {
			colors: {
				primary: '#5c6ac4',
				darkPrimary: 'white',
			},
			height: {
				header: '64px',
			},
		},
	},
	darkMode: 'class',
}
