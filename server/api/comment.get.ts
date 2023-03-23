import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async event => {
	// h3Event return request path
	const { path } = getQuery(event)
	const post = await prisma.post.findUnique({
		where: {
			path: path.toString(),
		},
	})
	if (!post) {
		await prisma.post.create({
			data: {
				path: path.toString(),
			},
		})
		return {
			data: [],
		}
	}
	let comments = await prisma.comment.findMany({
		where: {
			postId: post.id,
		},
		orderBy: {
			createdAt: 'desc',
		},
	})
	return {
		data: comments,
	}
})
