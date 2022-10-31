<template>
	<div>
		<Header />
		<div
			class="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-7xl relative flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-8 min-h-[calc(100vh-4rem)]"
		>
			<aside
				v-if="hasChildren"
				class="hidden overflow-y-auto overflow-x-hidden pb-8 lg:sticky lg:col-span-2 lg:block lg:max-h-[calc(100vh-4rem)] lg:top-16 lg:self-start lg:pt-8"
			>
				<Aside />
			</aside>

			<article
				class="relative flex flex-col flex-1 pb-8 lg:mt-0 page-body lg:col-span-8 pt-4 lg:pt-8 main-content"
				:class="[!hasChildren ? 'lg:col-start-3' : '']"
			>
				<slot />
				<PrevNext />
			</article>
			<div
				v-if="toc.links.length > 0"
				class="lg:block sticky flex items-center px-4 -mx-4 toc top-[64px] lg:max-h-[calc(100vh-4rem)] sm:-mx-6 sm:px-6 lg:col-span-2 lg:mx-0 lg:self-start lg:bg-transparent lg:top-16 lg:px-0 lg:pt-8 lg:backdrop-blur-none overflow-y-auto overflow-x-hidden navbar"
			>
				<div class="w-full cursor-pointer sm:cursor-auto">
					<button class="flex items-center gap-1 py-3 lg:hidden">
						<span
							class="text-xs font-semibold"
							@click="showNavbar = !showNavbar"
							>目录
						</span>
						<span v-if="showNavbar" class="arrow-down"></span>
						<span v-else class="arrow-right"></span>
					</button>
					<div
						:class="[
							showNavbar
								? 'flex flex-col space-y-1 sm:space-y-2 mb-4 lg:mt-0 lg:block'
								: 'lg:flex flex-col space-y-1 sm:space-y-2 mb-4 lg:mt-0 hidden',
						]"
					>
						<div
							class="items-center hidden overflow-hidden text-sm font-semibold lg:flex"
						>
							目录
						</div>
						<Toc :links="toc.links" />
					</div>
				</div>
			</div>
		</div>
		<!-- <Teleport to="body"> -->
		<AsideNav />
		<!-- </Teleport> -->
	</div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: navigation } = await useAsyncData('navigation', () =>
	fetchContentNavigation()
)
const parentPath = route.params.slug[0] ? '/' + route.params.slug[0] : '/'
const currentRoute = navigation.value.find(item => item._path === parentPath)
const hasChildren = !!currentRoute?.children
const { toc } = useContent()
const showNavbar = ref(false)
</script>

<style scoped>
.navbar ::before {
	backdrop-filter: saturate(180%) blur(20px);
	background-color: rgb(255 255 255 / 0.8);
	content: ' ';
	display: block;
	height: 100%;
	position: absolute;
	right: 0;
	top: 0;
	width: 100%;
	z-index: -1;
}
.dark .navbar ::before {
	background-color: black;
}
</style>
