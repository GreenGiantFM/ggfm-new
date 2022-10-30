import { NextApiRequest, NextApiResponse } from 'next'
import { getFileData, getFiles } from '@lib/posts'

type Query = {
	page: string
	limit: string
}

export type BlogData = {
	title: string
	autor: string
	featured_image: string
	posting_date: string
	youtube_link?: string
	tags: string[]
}

export default async function API(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req

	try {
		switch (method) {
			case 'GET': {
				const query = req.query as Query
				const page = parseInt(query.page)
				const limit = parseInt(query.limit)
				const start = page * limit

				const files = (await getFiles('/posts/blogs'))
					.sort((a, b) => b.localeCompare(a))
					.slice(start, start + limit)

				const data = await Promise.all(
					files.map(fileName => getFileData<BlogData>(`/posts/blogs/${fileName}`))
				)

				return res.json(data)
			}

			default:
				res.setHeader('Allow', ['GET'])
				res.status(405).end(`Method ${method} Not Allowed`)
		}
	} catch (err) {
		console.error(err)
		res.status(500)
	} finally {
		res.end()
	}
}
