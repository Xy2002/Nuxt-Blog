<template>
	<div
		v-if="menu.visible.value"
		class="fixed inset-0 z-50 flex items-start overflow-y-auto bg-opacity-50 backdrop-blur dark:bg-opacity-50 lg:hidden"
		@click="clickMask"
	>
		<div
			ref="reactiveNavRef"
			class="w-full max-w-xs min-h-full px-4 pb-12 shadow bg-white sm:px-6"
		>
			<div
				class="flex items-center justify-between gap-2 border-b border-transparent h-header"
			>
				<button
					class="relative z-10 text-gray-500 hover:text-gray-700 rounded-xl"
					aria-label="Menu"
					@click="menu.close()"
				>
					<IconClose />
				</button>
				<div class="flex items-center gap-4">
					<div
						class="flex items-center justify-end flex-none col-span-2 lg:gap-4 lg:pl-4 overflow-x-hidden"
					>
						<NuxtLink
							v-for="(tool, index) in appConfig.nav.toolItem"
							:key="index"
							:to="tool.href"
							:target="tool.target ? tool.target : '_blank'"
							><i
								:class="[...tool.icon]"
								class="text-xl flex items-center"
							></i
						></NuxtLink>
					</div>
				</div>
			</div>
			<AsideTree :navigation="navigation" />
		</div>
	</div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()
const reactiveNavRef = ref(null)
const { data: navigation } = await useAsyncData('navigation', () =>
	fetchContentNavigation()
)
const menu = useMenu()

const clickMask = e => {
	const flag = Array.from(e.path).includes(reactiveNavRef.value)
	if (!flag) {
		menu.close()
	}
}
</script>
