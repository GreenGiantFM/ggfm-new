import { NextApiRequest, NextApiResponse } from 'next'
import { getFilesAndData } from '@lib/posts'
import '@lib/events'

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
				return res.json(await getFilesAndData(['posts', 'events'], req.query))
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
