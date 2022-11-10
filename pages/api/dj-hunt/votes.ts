import { NextApiRequest, NextApiResponse } from 'next'
import HuntVote from '@models/hunt-vote'
import DJTrainee from '@models/dj-trainee'
import { isValidHost } from '@lib/utils'
import dbConnect from '@lib/db'

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
				const tally = await DJTrainee.aggregate()
					.lookup({
						from: 'huntvotes',
						localField: '_id',
						foreignField: 'candidate',
						as: 'votes'
					})
					.addFields({
						count: { $size: '$votes' }
					})
					.project({ count: 1, nickname: 1, image: 1 })
					.sort({ count: -1, nickname: 1 })

				res.json(tally)
				break
			}

			case 'POST': {
				const { email, selection } = req.body as Body
				if (!isValidHost(req.headers.host)) {
					return res.status(403)
				}

				if (!email) throw Error('You are not logged in!')
				if (!selection) throw Error('No candidate selected.')

				await dbConnect()
				const count = await HuntVote.countDocuments({ email })
				if (count) throw Error('You have already voted!')

				await HuntVote.insertMany(selection.map(candidate => ({ email, candidate })))
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
