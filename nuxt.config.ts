import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)
export default defineNuxtConfig({
	modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
	tailwindcss: {
		// add '~tailwind.config` alias
		exposeConfig: true,
	},
	css: ['~/assets/css/notion.css', '~/assets/css/markdown.css'],
	content: {
		highlight: {
			theme: 'one-dark-pro',
			preload: [
				'json',
				'js',
				'ts',
				'html',
				'css',
				'vue',
				'diff',
				'shell',
				'markdown',
				'yaml',
				'bash',
				'ini',
			],
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
		{
			prefix: '',
			path: resolve('./components/prose'),
			global: true,
		},
		resolve('./components'),
	],
	colorMode: {
		classSuffix: '',
		dataValue: 'theme',
	},
	darkMode: 'class',
	nitro: {
		preset: 'vercel',
	},
	plugins: [
		{
			src: '~/plugins/mavonEditor',
			mode: 'client',
		},
	],
})
