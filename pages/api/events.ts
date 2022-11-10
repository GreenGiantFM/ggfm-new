import { NextApiRequest, NextApiResponse } from 'next'
import { getFileData, getFiles } from '@lib/posts'
import '@lib/events'

type Query = {
	page?: string
	limit?: string
}

export type EventData = {
	title: string
	location: string
	start_date: string
	end_date?: string
	time?: string
	featured_image: string
	posting_date: string
	tags: string[]
}

export default async function API(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req

	try {
		switch (method) {
			case 'GET': {
				const dirPath = ['posts', 'events']
				const query = req.query as Query
				const page = query.page ? parseInt(query.page) : 0
				const limit = query.limit ? parseInt(query.limit) : 4
				const start = page * limit

				const files = (await getFiles(dirPath))
					.sort((a, b) => b.localeCompare(a))
					.slice(start, start + limit)

				const data = await Promise.all(
					files.map(fileName => getFileData<EventData>(dirPath.concat(fileName)))
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

export const config = {
	unstable_includeFiles: ['posts/events'],
}
