import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)
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
		markdown: {
			toc: {
				depth: 4,
				searchDepth: 4,
			},
		},
	},
	components: [
		{
			prefix: '',
			path: resolve('./components/icons'),
			global: true,
		},
		resolve('./components'),
	],
})
