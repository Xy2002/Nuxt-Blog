<template>
	<div>
		<ul class="list-none px-0 py-0 m-0 text-sm">
			<li
				v-for="link in links"
				:key="link.text"
				class="list-none my-2 pl-2 text-gray-600 font-semibold cursor-pointer"
				:class="[
					activeHeadings.includes(link.id)
						? '!text-primary'
						: 'text-gray-600 hover:text-primary',
				]"
			>
				<a :href="`#${link.id}`">
					{{ link.text }}
				</a>
				<Toc v-if="link.children" :links="link.children" />
			</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
import Toc from './Toc.vue'
defineProps<{ links: any }>()
const route = useRoute()
const { activeHeadings, updateHeadings } = useScroll()

watch(
	() => route.path,
	() => {
		if (process.client) {
			setTimeout(() => {
				updateHeadings([
					...document.querySelectorAll(
						'.document-driven-page h1, .main-content div h1'
					),
					...document.querySelectorAll(
						'.document-driven-page h2, .main-content div h2'
					),
					...document.querySelectorAll(
						'.document-driven-page h3, .main-content div h3'
					),
					...document.querySelectorAll(
						'.document-driven-page h4, .main-content div h4'
					),
					...document.querySelectorAll(
						'.document-driven-page h4, .main-content div h5'
					),
				])
			}, 300)
		}
	},
	{
		immediate: true,
	}
)
</script>
