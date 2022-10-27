<template>
	<div>
		<Header />
		<Aside />
		<main :class="[hasChildren ? 'pl-80' : 'pl-0']">
			<article
				class="px-9 py-8 max-w-4xl mx-auto my-0"
				style="color: #2c3e50"
			>
				<slot />
			</article>
		</main>
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
</script>

<style scoped>
.active {
	background-color: red;
}
</style>
