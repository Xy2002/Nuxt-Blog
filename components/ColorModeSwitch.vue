<template>
	<button
		aria-label="Color Mode"
		class="inline-block u-text-gray-500 hover:u-text-gray-700"
		@click="onClick"
	>
		<IconDark v-if="colorMode.preference === 'dark'" :class="size" />
		<IconLight v-else :class="size" />
	</button>
</template>

<script setup lang="ts">
// import ColorScheme from '@nuxtjs/color-mode'
defineProps({
	size: {
		type: String,
		default: 'w-5 h-5',
	},
})

const colorMode = useColorMode()
const onClick = () => {
	const values = ['light', 'dark']
	const index = values.indexOf(colorMode.preference)
	const next = (index + 1) % values.length

	colorMode.preference = values[next]
}
</script>
