<template>
	<ul class="text-xl pl-0" style="line-height: 2">
		<!-- depth 2 -->
		<li
			v-for="(item, index) in children"
			:key="index"
			class="list-none"
			:class="[item._path === route.fullPath ? 'text-primary' : '']"
		>
			<nuxt-link
				v-if="!item.children"
				:to="item._path"
				class="hover:bg-gray-100 u-text-gray-900 group flex w-full cursor-pointer items-center justify-between py-1.5 text-base font-semibold dark:hover:bg-transparent dark:hover:text-white"
			>
				{{ item.title }}
			</nuxt-link>
			<!-- depth 3 -->
			<section v-else class="font-bold">
				<p
					class="u-text-gray-900 group flex w-full items-center justify-between py-1.5 text-base font-semibold my-0 cursor-pointer"
					@click="
						collapsedMap[item._path] = !collapsedMap[item._path]
					"
				>
					{{ item.title }}
					<span
						:class="[
							collapsedMap[item._path]
								? 'arrow-down'
								: 'arrow-right',
						]"
					></span>
				</p>
				<ul
					v-show="collapsedMap[item._path]"
					class="my-0 overflow-hidden pl-0"
				>
					<li
						v-for="(childrenItem, childrenIndex) in item.children"
						:key="childrenIndex"
						class="block hover:bg-gray-100 text-base border-l dark:hover:bg-transparent dark:hover:text-white border-gray-200 hover:border-gray-400"
						:class="[
							childrenItem._path === route.fullPath
								? ['text-primary', 'border-primary']
								: '',
						]"
					>
						<nuxt-link :to="childrenItem._path" class="block pl-4">
							{{ childrenItem.title }}
						</nuxt-link>
					</li>
				</ul>
			</section>
		</li>
	</ul>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: navigation } = await useAsyncData('navigation', () =>
	fetchContentNavigation()
)
const parentPath = route.params.slug[0] ? '/' + route.params.slug[0] : '/'
const currentRoute = navigation.value.find(item => item._path === parentPath)
const children = reactive(currentRoute.children ? currentRoute.children : [])

const collapsedMap = useState(`aside-collapse-map-${parentPath}`, () => {
	return children
		.filter(link => !!link.children)
		.reduce((map, link) => {
			map[link._path] = true
			return map
		}, {})
})
</script>
