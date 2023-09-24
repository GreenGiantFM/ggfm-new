import dbConnect from '@lib/db'
import { isValidHost, serialize } from '@lib/utils'
import Dates from '@models/dates'
import Track, { ITrack } from '@models/track'
import TrackVote from '@models/track-vote'
import axios from 'axios'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

type Body = {
	start: string
	end: string
	tracks: string
}

type SpotifyToken = {
	access_token: string
	token_type: 'Bearer'
	expires_in: number
}

export async function POST(req: Request) {
	const { tracks, start, end } = await req.json() as Body
	const time = 'T00:00:00.000+08:00'

	if (tracks.length == 0) return NextResponse.json('Empty tracklist', { status: 400 })
	if (!start) return NextResponse.json('No start date', { status: 400 })
	if (!end) return NextResponse.json('No end date', { status: 400 })

	if (!isValidHost(req.headers.get('host'))) {
		return NextResponse.json('', { status: 403 })
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
	const [{ data }] = await Promise.all([
		axios.post<SpotifyToken>(`https://accounts.spotify.com/api/token`, serialize({ grant_type: 'client_credentials' }), {
			headers: {
				Authorization: 'Basic ' + Buffer.from(`${process.env.SPOTIFY_ID}:${process.env.SPOTIFY_SECRET}`).toString('base64'),
			},
		}),
		dbConnect()
	])

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

		// check if there are any null data
		for (let i = 0; i < trackResponse.data.tracks.length; i++) {
			if (trackResponse.data.tracks[i] == null) {
				return NextResponse.json(`ID #${i + 1} is invalid.`, { status: 400 })
			}
		}

		const trackData = trackResponse.data.tracks.map(t => ({
			_id: t.id,
			name: t.name,
			preview_url: t.preview_url,
			artists: t.artists.map(a => a.name),
			image: t.album.images[1].url
		} as ITrack))

		await Promise.all([
			Track.insertMany(trackData),
			Dates.updateOne({ name: 'Hitlist' }, { start: start + time, end: end + time }, { upsert: true })
		])

		revalidatePath('/hitlists')
		revalidatePath('/hitlists/polls')

		return NextResponse.json('')
	} catch (e) {
		console.error(e)
		return NextResponse.json('An error has occured', { status: 401 })
	}
}
