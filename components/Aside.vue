<template>
	<aside
		v-if="hasChildren"
		class="w-80 border-r border-r-gray-200 fixed box-border overflow-y-auto top-12 left-0 bottom-0"
	>
		<ul class="py-6 text-xl pl-0" style="line-height: 2; color: #2c3e50">
			<!-- 二级菜单 -->
			<li
				v-for="(item, index) in children"
				:key="index"
				class="list-none"
				:class="[item._path === route.fullPath ? 'text-primary' : '']"
			>
				<nuxt-link
					v-if="!item.children"
					:to="item._path"
					class="font-bold block hover:bg-gray-100 pl-8"
				>
					{{ item.title }}
				</nuxt-link>
				<!-- 三级菜单 -->
				<section v-else class="font-bold">
					<p class="my-0 flex items-center pl-8">
						{{ item.title }}
					</p>
					<ul class="my-0 overflow-hidden">
						<li
							v-for="(
								childrenItem, childrenIndex
							) in item.children"
							:key="childrenIndex"
							class="block hover:bg-gray-100 text-lg"
							:class="[
								childrenItem._path === route.fullPath
									? 'text-primary'
									: '',
							]"
						>
							<nuxt-link
								:to="childrenItem._path"
								class="block pl-2"
							>
								{{ childrenItem.title }}
							</nuxt-link>
						</li>
					</ul>
				</section>
			</li>
		</ul>
	</aside>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: navigation } = await useAsyncData('navigation', () =>
	fetchContentNavigation()
)
const parentPath = route.params.slug[0] ? '/' + route.params.slug[0] : '/'
const currentRoute = navigation.value.find(item => item._path === parentPath)
const hasChildren = !!currentRoute?.children
const children = reactive(currentRoute?.children ? currentRoute.children : [])
</script>
