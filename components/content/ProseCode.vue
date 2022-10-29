<template>
	<div
		class="relative my-2"
		@mouseover="isHover = true"
		@mouseout="isHover = false"
	>
		<div><slot /></div>
		<span
			class="absolute opacity-100 top-1 right-1 z-0 rounded-lg py-1 pr-2 font-mono text-xs leading-none tracking-tight text-gray-400"
		>
			{{ language }}
		</span>
		<div
			class="absolute right-2 bottom-2 h-8 w-8 bg-black p-2 font-mono text-xs font-semibold text-gray-400 rounded-lg transition-all cursor-pointer"
			:class="[
				isHover ? 'opacity-100' : 'opacity-0',
				isHover ? 'scale-100' : 'scale-0',
			]"
			@click="copyCodeThrottled"
		>
			<IconCopy v-if="!copied" />
			<IconSuccess v-else />
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	code: string
	language: string
}>()

const isHover = ref(false)
const copied = ref(false)

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

<style scoped>
:deep(code) {
	display: flex;
	flex-direction: column;
}
</style>
