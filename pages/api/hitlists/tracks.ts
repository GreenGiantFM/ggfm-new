import { NextApiRequest, NextApiResponse } from 'next'
import Track, { ITrack } from '@models/track'
import axios from 'axios'
import { serialize } from '@lib/utils'
import TrackVote from '@models/track-vote'

type Body = {
	tracks: string
}

type SpotifyToken = {
	access_token: string
	token_type: 'Bearer'
	expires_in: number
}

export default async function API(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req

	try {
		switch (method) {
			case 'GET': {
				const tracks = await Track.find({}).lean()
				res.json(tracks)
				break
			}

			case 'POST': {
				const { tracks } = req.body as Body

				if (req.headers.host !== process.env.NEXT_PUBLIC_VERCEL_URL) {
					return res.status(403)
				}

				// data cleaning
				const ids = tracks.split(/[\s,]/)
					.reduce((list, track) => {
						const temp = track.trim()
						if (temp) list.push(temp)
						return list
					}, [] as string[])
					.join(',')

				// get authorized session token
				const { data } = await axios.post<SpotifyToken>(`https://accounts.spotify.com/api/token`, serialize({ grant_type: 'client_credentials' }), {
					headers: {
						Authorization: 'Basic ' + Buffer.from(`${process.env.SPOTIFY_ID}:${process.env.SPOTIFY_SECRET}`).toString('base64'),
					},
				})

				try {
					const [trackResponse] = await Promise.all([
						axios.get<SpotifyApi.MultipleTracksResponse>(`https://api.spotify.com/v1/tracks?ids=${ids}`, {
							headers: {
								Authorization: 'Bearer ' + data.access_token
							}
						}),
						Track.deleteMany(),
						TrackVote.deleteMany()
					])

					const trackData = trackResponse.data.tracks.map(t => ({
						_id: t.id,
						name: t.name,
						preview_url: t.preview_url,
						artists: t.artists.map(a => a.name),
						image: t.album.images[1].url
					} as ITrack))

					await Track.insertMany(trackData)
					await res.revalidate('/hitlists')
				} catch (e) {
					console.log(e)
				}

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
