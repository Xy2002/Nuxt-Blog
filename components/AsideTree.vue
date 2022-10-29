<template>
	<ul class="list-none px-0 py-0 m-0">
		<li
			v-for="(item, index) in navigation"
			:key="index"
			class="border-gray-100 hover:border-gray-300 list-none my-2 pl-4"
			:class="[
				!!item.children
					? 'text-black dark:text-white'
					: 'border-l-2 border-gray-100 hover:border-gray-300 text-gray-600  hover:bg-gray-100 dark:hover:bg-transparent dark:hover:text-white cursor-pointer',
				route.fullPath === item._path ? '!text-primary' : '',
			]"
		>
			<NuxtLink v-if="!item.children" :to="item._path">{{
				item.title
			}}</NuxtLink>
			<span v-else>
				{{ item.title }}
			</span>
			<AsideTree v-if="!!item.children" :navigation="item.children" />
		</li>
	</ul>
</template>

<script setup lang="ts">
defineProps<{
	navigation: any
}>()

const route = useRoute()
</script>
