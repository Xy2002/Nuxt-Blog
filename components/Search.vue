<template>
	<div>
		<IconSearch @click="search.open" class="cursor-pointer" />

		<Teleport to="body">
			<div
				class="h-screen w-screen fixed top-0 left-0 z-50 box-border cursor-pointer dark:bg-black bg-slate-300 dark:!bg-opacity-60 bg-opacity-80"
				v-if="search.visible.value"
				@click="clickMask"
			>
				<div
					class="lg:mt-20 mx-auto mb-auto dark:bg-zinc-700 bg-slate-100 rounded-md max-w-full h-full lg:h-auto lg:max-w-xl relative"
					ref="reactiveDivRef"
				>
					<div
						id="header"
						class="box-border mx-6 flex py-4 justify-between"
					>
						<form
							class="w-full h-14 flex items-center bg-white dark:bg-black justify-evenly rounded-md border-primary border"
						>
							<label><IconSearch class="!w-6 !h-6" /></label>
							<input
								placeholder="搜索文档"
								class="w-10/12 bg-white dark:bg-black outline-none"
								v-model="inputText"
							/>
							<button aria-label="Close">
								<IconClose
									class="dark:text-white text-black"
									@click.prevent="inputText = ''"
								/>
							</button>
						</form>
						<button
							class="text-primary text-sm ml-2"
							@click="search.close"
						>
							Cancel
						</button>
					</div>
					<div id="content" class="box-border mx-6 py-4">
						<span class="text-primary">Documention</span>

						<p v-if="searchResult.length === 0" class="text-center">
							No result
						</p>

						<ul class="pl-0">
							<li
								class="list-none rounded bg-white dark:bg-black hover:!bg-primary hover:text-white py-4 pl-6 mb-2"
								v-for="(item, index) in searchResult"
								:key="index"
							>
								<NuxtLink :to="item._path">
									{{ item.title }}
								</NuxtLink>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</Teleport>
	</div>
</template>

<script setup lang="ts">
const inputText = ref('')
const searchResult = ref([])
const search = useSearch()
const reactiveDivRef = ref(null)

watch(inputText, async newVal => {
	if (!!newVal) {
		let result = await queryContent()
			.where({ title: { $regex: newVal } })
			.find()
		searchResult.value = result.filter(item => item._extension === 'md')
	} else {
		searchResult.value = []
	}
})

const clickMask = e => {
	const flag = Array.from(e.path).includes(reactiveDivRef.value)
	if (!flag) {
		search.close()
	}
}
</script>
