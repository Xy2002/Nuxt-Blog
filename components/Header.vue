<template>
	<header
		class="flex justify-between items-center w-full h-12 px-4 py-2 transition-all"
		style="box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.04) !important"
	>
		<div class="flex items-center justify-between w-full">
			<div class="flex items-center">
				<NuxtLink
					style="color: #5b5777"
					class="font-semibold text-xl md:ml-4 md:mr-0 ml-10 mr-14"
					to="/"
				>
					{{ appConfig.blogName }}
				</NuxtLink>
				<div class="text-sm font-medium">
					<nav class="inline-block md:hidden">
						<div
							v-for="(item, index) in navigation"
							:key="index"
							class="nav-item"
							@mouseover="currentHoverIndex = index"
							@mouseleave="currentHoverIndex = -1"
						>
							<NuxtLink
								class="nav-links"
								:class="{
									'nav-links-active':
										currentHoverIndex === index ||
										route.path.split('/')[1] ===
											item._path.split('/')[1],
								}"
								:to="
									item.children && item.children.length > 0
										? item.children[0]._path
										: item._path
								"
							>
								{{ item.title }}</NuxtLink
							>
						</div>
						<div
							v-for="(item, index) in appConfig.nav.navItem"
							:key="index"
							class="nav-item"
							@mouseover="currentExtraHoverIndex = index"
							@mouseleave="currentExtraHoverIndex = -1"
						>
							<div class="flex justify-center items-center">
								<span
									class="nav-links flex justify-center items-center"
									:class="{
										'nav-links-active':
											currentExtraHoverIndex === index,
									}"
								>
									<span>
										{{ item.title }}
									</span>
									<span class="arrow-down"></span>
								</span>
							</div>
							<ul
								v-show="currentExtraHoverIndex === index"
								class="dropdown-menu"
							>
								<NuxtLink
									v-for="(
										subItem, subItemIndex
									) in item.subItem"
									:key="subItemIndex"
									class="leading-6 h-6 block font-normal pr-6 pl-5 text-xs hover:text-primary"
									:to="subItem.href"
									target="_blank"
								>
									<span class="flex items-center"
										>{{ subItem.name }} <IconLink
									/></span>
								</NuxtLink>
							</ul>
						</div>
					</nav>
				</div>
			</div>

			<div>
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
	</header>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()
const currentHoverIndex = ref(-1)
const currentExtraHoverIndex = ref(-1)
const { navigation } = useContent()
</script>
