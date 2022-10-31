<template>
	<header
		class="sticky top-0 z-10 w-full border-b h-header border-gray-100 dark:border-neutral-800 bg-white/80 dark:bg-black/80"
		style="
			box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.04) !important;
			backdrop-filter: saturate(180%) blur(20px);
		"
	>
		<div
			class="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-7xl grid h-full grid-cols-12 lg:gap-8"
		>
			<!-- part 1 of 3: blog name or menu button  -->
			<div class="flex items-center flex-none col-span-2">
				<NuxtLink class="font-semibold text-xl hidden lg:block" to="/">
					{{ appConfig.blogName }}
				</NuxtLink>
				<button
					class="block lg:hidden"
					@click="menu.open()"
					aria-label="Menu"
				>
					<IconMenu />
				</button>
			</div>
			<!-- part 2 of 3: nav or or blog name -->
			<div
				class="text-sm font-medium flex items-center justify-center flex-1 col-span-8"
			>
				<NuxtLink
					class="font-semibold text-xl flex items-center flex-none lg:hidden"
					to="/"
				>
					{{ appConfig.blogName }}
				</NuxtLink>

				<nav class="hidden lg:flex items-center">
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
							class="dropdown-menu px-0"
						>
							<NuxtLink
								v-for="(subItem, subItemIndex) in item.subItem"
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
			<!-- part 3 of 3: extra link -->
			<div
				class="flex items-center justify-end flex-none col-span-2 lg:gap-4 lg:pl-4 overflow-x-hidden"
			>
				<ColorModeSwitch class="hidden lg:block" />
				<Search />
				<NuxtLink
					v-for="(tool, index) in appConfig.nav.toolItem"
					:key="index"
					:to="tool.href"
					:target="tool.target ? tool.target : '_blank'"
					class="hidden lg:block"
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
const menu = useMenu()
</script>
