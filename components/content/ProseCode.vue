<template>
	<div
		class="relative my-2"
		@mouseover="isHover = true"
		@mouseout="isHover = false"
	>
		<div v-html="html"></div>
		<span
			class="absolute opacity-100 top-1 right-1 z-0 rounded-lg py-1 pr-2 font-mono text-xs leading-none tracking-tight text-gray-400"
			>{{ language }}</span
		>
		<div
			class="absolute right-2 bottom-2 h-8 w-8 bg-black p-2 font-mono text-xs font-semibold text-gray-400 rounded-lg transition-all cursor-pointer"
			:class="[
				isHover ? 'opacity-100' : 'opacity-0',
				isHover ? 'scale-100' : 'scale-0',
			]"
			@click="copyCodeThrottled"
		>
			<svg
				v-if="!copied"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				aria-hidden="true"
				role="img"
				class="h-4 w-4"
				style=""
				width="1em"
				height="1em"
				viewBox="0 0 1792 1792"
			>
				<path
					fill="currentColor"
					d="M1696 384q40 0 68 28t28 68v1216q0 40-28 68t-68 28H736q-40 0-68-28t-28-68v-288H96q-40 0-68-28t-28-68V640q0-40 20-88t48-76L476 68q28-28 76-48t88-20h416q40 0 68 28t28 68v328q68-40 128-40h416zm-544 213L853 896h299V597zM512 213L213 512h299V213zm196 647l316-316V128H640v416q0 40-28 68t-68 28H128v640h512v-256q0-40 20-88t48-76zm956 804V512h-384v416q0 40-28 68t-68 28H768v640h896z"
				></path>
			</svg>
			<svg
				v-else
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				aria-hidden="true"
				role="img"
				class="h-4 w-4"
				width="1.25em"
				height="1em"
				viewBox="0 0 1600 1280"
			>
				<path
					fill="currentColor"
					d="M1575 310q0 40-28 68l-724 724l-136 136q-28 28-68 28t-68-28l-136-136L53 740q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295l656-657q28-28 68-28t68 28l136 136q28 28 28 68z"
				></path>
			</svg>
		</div>
	</div>
</template>

<script setup lang="ts">
const { $highlighter } = useNuxtApp()
const props = defineProps<{
	code: string
	language: string
}>()
const html = ref('')
const isHover = ref(false)
const copied = ref(false)

html.value = $highlighter.codeToHtml(props.code, { lang: props.language })

const copyCode = () => {
	navigator.clipboard.writeText(props.code)
	copied.value = true

	setTimeout(() => {
		copied.value = false
	}, 1000)
}

const throttle = (func, limit) => {
	let inThrottle
	return function () {
		const args = arguments
		const context = this
		if (!inThrottle) {
			func.apply(context, args)
			inThrottle = true
			setTimeout(() => (inThrottle = false), limit)
		}
	}
}

const copyCodeThrottled = throttle(copyCode, 1000)
</script>
