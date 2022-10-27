import { getHighlighter, setCDN } from 'shiki-es'

setCDN('/shiki/')

export default defineNuxtPlugin(async () => {
	return {
		provide: {
			highlighter: await getHighlighter({
				theme: 'one-dark-pro',
				langs: ['javascript'],
			}),
		},
	}
})
