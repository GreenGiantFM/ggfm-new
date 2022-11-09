import { NextApiRequest, NextApiResponse } from 'next'
import { getFileData, getFiles } from '@lib/posts'

type Query = {
	page?: string
	limit?: string
}

export type BlogData = {
	title: string
	author: string
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
				const dirPath = ['posts', 'blogs']
				const query = req.query as Query
				const page = query.page ? parseInt(query.page) : 0
				const limit = query.limit ? parseInt(query.limit) : 4
				const start = page * limit

				const files = (await getFiles(dirPath))
					.sort((a, b) => b.localeCompare(a))
					.slice(start, start + limit)

				const data = await Promise.all(
					files.map(fileName => getFileData<BlogData>(dirPath.concat(fileName)))
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
