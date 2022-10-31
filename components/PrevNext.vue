<script setup lang="ts">
import { upperFirst } from 'scule'

const { prev, next, navigation } = useContent()
const { navDirFromPath } = useContentHelpers()

const directory = link => {
	const nav = navDirFromPath(link._path, navigation.value || [])

	if (nav && nav[0]) {
		return nav[0]._path
	} else {
		const dirs = link.split('/')
		const directory = dirs.length > 1 ? dirs[dirs.length - 2] : ''
		return directory.split('-').map(upperFirst).join(' ')
	}
}
</script>

<template>
	<div
		v-if="prev || next"
		class="flex flex-col-reverse justify-between gap-3 sm:flex-row sm:items-center my-5"
	>
		<NuxtLink
			v-if="prev"
			:to="prev._path"
			class="relative min-w-0 p-3 border rounded-lg hover:border-primary hover:text-primary border-gray-100 dark:border-neutral-800"
		>
			<p
				class="h-4 mb-1 text-xs font-medium text-right truncate u-text-gray-500 my-0"
			>
				{{ directory(prev._path) }}
			</p>

			<p class="flex items-center gap-3 my-0">
				<IconArrowLeft class="dark:white" />
				<span
					class="flex-1 font-medium leading-5 text-right truncate"
					>{{ prev.title }}</span
				>
			</p>
		</NuxtLink>
		<span v-else />

		<NuxtLink
			v-if="next"
			:to="next._path"
			class="relative min-w-0 p-3 border rounded-lg hover:border-primary hover:text-primary border-gray-100 dark:border-neutral-800"
		>
			<p
				class="h-4 mb-1 text-xs font-medium truncate u-text-gray-500 my-0"
			>
				{{ directory(next._path) }}
			</p>

			<p class="flex items-center gap-3 my-0">
				<span class="flex-1 font-medium leading-5 truncate">{{
					next.title
				}}</span>
				<IconArrowRight class="dark:white" />
			</p>
		</NuxtLink>
	</div>
</template>
