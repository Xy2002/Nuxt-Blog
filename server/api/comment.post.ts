import { PrismaClient } from '@prisma/client'
import UAParser from 'ua-parser-js'
const prisma = new PrismaClient()

export default defineEventHandler(async event => {
	const { path } = getQuery(event)
	const headers = getRequestHeaders(event)
	// console.log(headers)
	const parser = new UAParser(headers['user-agent'])
	const uaRet = parser.getResult()
	const content: {
		name: string
		content: string
		email: string
		site?: string
	} = await readBody(event)
	// console.log(path, content)
	let post = await prisma.post.findUnique({
		where: {
			path: path.toString(),
		},
	})
	if (!post) {
		post = await prisma.post.create({
			data: {
				path: path.toString(),
			},
		})
	}
	await prisma.comment.create({
		data: {
			body: content.content,
			postId: post.id,
			email: content.email,
			name: content.name,
			os: uaRet.os.name,
			browser: uaRet.browser.name + ' ' + uaRet.browser.version,
			site: content.site,
		},
	})
	return true
})
