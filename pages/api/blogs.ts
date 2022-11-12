import { NextApiRequest, NextApiResponse } from 'next'
import { getFilesAndData } from '@lib/posts'
import '@lib/blogs'

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
				return res.json(await getFilesAndData(['posts', 'blogs'], req.query))
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
