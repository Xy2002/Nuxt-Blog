<template>
	<div>
		<ClientOnly fallback-tag="span" fallback="Loading comments">
			<div class="w-full border-t mb-8"></div>
			<div class="flex gap-4">
				<div
					class="flex flex-row flex-1 border-[#909399] border-opacity-[0.31] border rounded dark:border-[#DCDFE6]"
				>
					<div
						style="
							background-clip: padding-box;
							background-color: rgba(144, 147, 153, 0.13);
						"
						class="text-[#2C3E50] px-4 py-2 w-1/3 text-center whitespace-nowrap text-sm dark:text-[#adbac7]"
					>
						昵称
					</div>

					<input
						type="text"
						class="px-3 box-border w-full h-full outline-none dark:bg-transparent border focus:border-[#409eff] dark:border-transparent dark:focus:border-[#409eff]"
						placeholder="必填"
						v-model="name"
					/>
				</div>
				<div
					class="flex flex-row flex-1 border-[#909399] border-opacity-[0.31] border rounded dark:border-[#DCDFE6]"
				>
					<div
						style="
							background-clip: padding-box;
							background-color: rgba(144, 147, 153, 0.13);
						"
						class="text-[#2C3E50] px-4 py-2 w-1/3 text-center whitespace-nowrap text-sm dark:text-[#adbac7]"
					>
						邮箱
					</div>

					<input
						type="text"
						class="px-3 box-border w-full h-full outline-none dark:bg-transparent border focus:border-[#409eff] dark:border-transparent dark:focus:border-[#409eff]"
						placeholder="必填"
						v-model="email"
					/>
				</div>
				<div
					class="flex flex-row flex-1 border-[#909399] border-opacity-[0.31] border rounded dark:border-[#DCDFE6]"
				>
					<div
						style="
							background-clip: padding-box;
							background-color: rgba(144, 147, 153, 0.13);
						"
						class="text-[#2C3E50] px-4 py-2 w-1/3 text-center whitespace-nowrap text-sm dark:text-[#adbac7]"
					>
						网址
					</div>

					<input
						type="text"
						class="px-3 box-border w-full h-full outline-none dark:bg-transparent border focus:border-[#409eff] dark:border-transparent dark:focus:border-[#409eff]"
						placeholder="选填"
						v-model="url"
					/>
				</div>
			</div>
			<mavon-editor
				style="height: 300px; width: 100%; z-index: 1; margin-top: 20px"
				:toolbars="toolbars"
				:subfield="false"
				v-model="content"
				ref="md_editor"
			></mavon-editor>
			<div class="flex flex-row-reverse items-center mt-4">
				<button
					class="px-5 py-1.5 rounded bg-[#409EFF] border-[#409EFF] text-white"
					@click="submit"
				>
					发送
				</button>
				<a
					alt="Markdown is supported"
					href="https://guides.github.com/features/mastering-markdown/"
					target="_blank"
					rel="noopener noreferrer"
					class="text-[#909399] inline-block w-5 mr-3"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 640 512"
					>
						<path
							d="M593.8 59.1H46.2C20.7 59.1 0 79.8 0 105.2v301.5c0 25.5 20.7 46.2 46.2 46.2h547.7c25.5 0 46.2-20.7 46.1-46.1V105.2c0-25.4-20.7-46.1-46.2-46.1zM338.5 360.6H277v-120l-61.5 76.9-61.5-76.9v120H92.3V151.4h61.5l61.5 76.9 61.5-76.9h61.5v209.2zm135.3 3.1L381.5 256H443V151.4h61.5V256H566z"
						></path>
					</svg>
				</a>
			</div>
			<div class="mt-8">
				<div class="flex justify-between">
					<div
						class="text-xl text-[#2c3e50] font-bold dark:text-[#adbac7]"
					>
						{{ comments.length }}条评论
					</div>
					<div @click="refresh">
						<svg
							t="1679557852934"
							viewBox="0 0 1024 1024"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							p-id="3717"
							width="25"
							height="25"
							class="cursor-pointer"
						>
							<path
								d="M832 512a32 32 0 0 0-32 32c0 158.784-129.216 288-288 288s-288-129.216-288-288 129.216-288 288-288c66.208 0 129.536 22.752 180.608 64H608a32 32 0 0 0 0 64h160a32 32 0 0 0 32-32V192a32 32 0 0 0-64 0v80.96A350.464 350.464 0 0 0 512 192C317.92 192 160 349.92 160 544s157.92 352 352 352 352-157.92 352-352a32 32 0 0 0-32-32"
								fill="#409eff"
								p-id="3718"
							></path>
						</svg>
					</div>
				</div>
			</div>
			<div class="mt-8">
				<template v-for="comment in comments" :key="comment.id">
					<div>
						<a
							class="font-semibold text-base"
							v-if="comment.site"
							:style="{
								cursor: comment.site ? 'pointer' : 'default',
								color: comment.site ? '#409eff' : '#2c3e50',
							}"
							:href="comment.site"
							:target="comment.site"
						>
							{{ comment.name }}
						</a>
						<span v-else class="font-semibold text-base">
							{{ comment.name }}
						</span>

						<span
							class="text-sm text-[#2c3e50] ml-2 dark:text-[#adbac7]"
							>{{
								Math.floor(
									(new Date() -
										Date.parse(comment.createdAt)) /
										(24 * 3600 * 1000)
								) > 0
									? Math.floor(
											(new Date() -
												Date.parse(comment.createdAt)) /
												(24 * 3600 * 1000)
									  ) + '天前'
									: '今天'
							}}</span
						>
						<div v-html="comment.body"></div>
						<div class="text-[#999999] text-sm font-normal mb-4">
							<span>{{ comment.os }}</span>
							<span class="ml-4">{{ comment.browser }}</span>
						</div>
					</div>
				</template>
			</div>

			<div class="w-full border-t mt-4"></div>
		</ClientOnly>
	</div>
</template>

<script setup>
const md_editor = ref(null)
const route = useRoute()
const md = ref()
onMounted(() => {
	setTimeout(() => {
		md.value = md_editor.value.markdownIt
		refresh()
	}, 0)
})
const toolbars = {
	bold: true, // 粗体
	italic: true, // 斜体
	header: true, // 标题
	underline: true, // 下划线
	strikethrough: true, // 中划线
	mark: true, // 标记
	superscript: true, // 上角标
	subscript: true, // 下角标
	quote: true, // 引用
	ol: true, // 有序列表
	ul: true, // 无序列表
	link: true, // 链接
	imagelink: false, // 图片链接
	code: true, // code
	table: true, // 表格
	fullscreen: false, // 全屏编辑
	readmodel: true, // 沉浸式阅读
	htmlcode: true, // 展示html源码
	help: true, // 帮助
	undo: true, // 上一步
	redo: true, // 下一步
	trash: true, // 清空
	navigation: false, // 导航目录
	alignleft: true, // 左对齐
	aligncenter: true, // 居中
	alignright: true, // 右对齐
	subfield: true, // 单双栏模式
	preview: true, // 预览
}

const name = ref()
const email = ref()
const url = ref()
const content = ref()

const submit = () => {
	if (!name.value) {
		useMessage({
			message: '请输入昵称',
			type: 'error',
		})
		return
	}
	if (!email.value) {
		useMessage({
			message: '请输入邮箱',
			type: 'error',
		})
		return
	}
	if (!content.value) {
		useMessage({
			message: '请输入评论内容',
			type: 'error',
		})
		return
	}
	const data = {
		name: name.value,
		email: email.value,
		site: url.value,
		content: content.value,
	}
	$fetch(`/api/comment?path=${route.path}`, {
		method: 'POST',
		body: JSON.stringify(data),
	}).then(res => {
		if (res) {
			useMessage({
				message: '评论成功',
				type: 'success',
			})
			content.value = ''
			refresh()
		} else {
			useMessage({
				message: '评论失败',
				type: 'error',
			})
		}
	})
}

const comments = ref([])
const refresh = () => {
	$fetch(`/api/comment?path=${route.path}`).then(res => {
		let _comments = res.data
		comments.value = _comments.map(item => {
			item.body = md.value.render(item.body)
			return item
		})
	})
}
</script>
