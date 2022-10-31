export default defineNuxtPlugin((ctx: any) => {
	// Menu visible reference
	const visible = ref(false)

	// Open the menu
	const open = () => (visible.value = true)

	// Close the menu
	const close = () => (visible.value = false)

	// Toggle the menu (useful for one-off buttons)
	const toggle = () => (visible.value = !visible.value)

	// Watch route change, close on change
	ctx.$router.afterEach(() => setTimeout(close, 50))

	return {
		provide: {
			search: {
				visible,
				close,
				open,
				toggle,
			},
		},
	}
})
