export default defineNuxtConfig({
	modules: ['@nuxt/content', '@nuxtjs/tailwindcss'],
	tailwindcss: {
		// add '~tailwind.config` alias
		exposeConfig: true,
	},
	css: [
		'~/assets/css/notion.css',
		'~/assets/css/icons.css',
		'~/assets/css/markdown.css',
	],
	content: {
		highlight: {
			theme: 'one-dark-pro',
		},
		documentDriven: true,
	},
})
