<!-- 目前的 message 只支持全局只有一个，暂时不修改为多个 -->
<template>
	<ClientOnly>
		<div
			v-show="visible"
			class="redcat-message left flex items-center"
			@mouseover="clear"
			@mouseout="startTimer"
		>
			<span
				:style="{
					color: style.style.color,
				}"
				size="6px"
				@click="close"
				class="cursor-pointer"
			>
				<svg
					t="1679557352354"
					viewBox="0 0 1024 1024"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					p-id="2754"
					width="12"
					height="12"
					:fill="style.style.color"
				>
					<path
						d="M550.848 502.496l308.64-308.896a31.968 31.968 0 1 0-45.248-45.248l-308.608 308.896-308.64-308.928a31.968 31.968 0 1 0-45.248 45.248l308.64 308.896-308.64 308.896a31.968 31.968 0 1 0 45.248 45.248l308.64-308.896 308.608 308.896a31.968 31.968 0 1 0 45.248-45.248l-308.64-308.864z"
						p-id="2755"
					></path>
				</svg>
			</span>
			<span class="message-text">{{ message }}</span>
		</div>
	</ClientOnly>
</template>

<script lang="ts" setup>
import { getStyle, MessageProps, MessageType } from '~/composables/useMessage'
import { computed, Ref, ref } from 'vue'
type Nullable<T> = T | null
const message = ref('')
const type: Ref<MessageType> = ref('success')
const visible = ref(false)
const closeTime: Ref<Nullable<NodeJS.Timeout>> = ref(null)

const close = (): void => {
	visible.value = false
	closeTime.value && clearTimeout(closeTime.value)
	closeTime.value = null
}
// 暂时定为三秒后消失
const startTimer = (): void => {
	closeTime.value = setTimeout(() => {
		close()
	}, 3000)
}

const open = (props: MessageProps): void => {
	if (closeTime.value) {
		clearTimeout(closeTime.value)
	}

	message.value = props.message
	type.value = props.type
	visible.value = true

	startTimer()
}

// const zIndex = ref(new Date().getFullYear())

const style = computed(() => getStyle(type.value))

const clear = () => {
	closeTime.value && clearTimeout(closeTime.value)
}

defineExpose({
	open,
	close,
})
</script>

<style lang="css" scoped>
.redcat-message {
	min-width: 100%;
	padding: 15px 15px 15px 20px;
	border-radius: 5px;
	background-color: v-bind('style.style.background');
	border: v-bind('style.style.border');
	color: v-bind('style.style.color');
	pointer-events: all;
	line-height: 1;
}
.redcat-message .svg-icon {
	margin-right: 10px;
	cursor: pointer;
}
</style>
