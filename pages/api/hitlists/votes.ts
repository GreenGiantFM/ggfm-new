import { NextApiRequest, NextApiResponse } from 'next'
import TrackVote from '@models/track-vote'
import Track from '@models/track'
import dbConnect from '@lib/db'
import { isValidHost } from '@lib/utils'

type Body = {
	email?: string
	selection?: string[]
}

export default async function API(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req

	try {
		switch (method) {
			case 'GET': {
				await dbConnect()
				const tally = await Track.aggregate()
					.lookup({
						from: 'trackvotes',
						localField: '_id',
						foreignField: 'track',
						as: 'votes'
					})
					.addFields({
						count: { $size: '$votes' }
					})
					.project({ count: 1, name: 1, image: 1 })
					.sort({ count: -1, name: 1 })

				res.json(tally)
				break
			}

			case 'POST': {
				const { email, selection } = req.body as Body

				if (!isValidHost(req.headers.host)) {
					return res.status(403)
				}

				if (!email) throw Error('You are not logged in!')
				if (!selection) throw Error('No songs were selected.')

				await dbConnect()
				const count = await TrackVote.countDocuments({ email })
				if (count) throw Error('You have already voted!')

				await TrackVote.insertMany(selection.map(track => ({ email, track })))
				break
			}

			default:
				res.setHeader('Allow', ['GET', 'POST'])
				res.status(405).end(`Method ${method} Not Allowed`)
		}
	} catch (err) {
		console.error(err)
		res.status(500)
		if (err instanceof Error) {
			res.send(err.message)
		}
	} finally {
		res.end()
	}
}
