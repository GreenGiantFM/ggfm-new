import { NextApiRequest, NextApiResponse } from 'next'
import HuntVote from '@models/hunt-vote'

type Body = {
	email?: string
	selection?: string[]
}

export default async function API(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req

	try {
		switch (method) {
			case 'GET': {
				break
			}

			case 'POST': {
				const { email, selection } = req.body as Body

				if (!email) throw Error('You are not logged in!')
				if (!selection) throw Error('No candidate selected.')

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
