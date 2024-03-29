import { HitlistForm } from './hitlist-form'
import { directus } from '@lib/directus'
import { readItems } from '@directus/sdk'
import { cache } from 'react'

export const metadata = {
	title: 'Hitlist',
	description: "Voting polls for this week's GGFM's Top 20!",
}

export const revalidate = 0 // remove when revalidatePath is fixed

const getData = cache(async () => {
	const [[date], tracks] = await Promise.all([
		directus.request(readItems('dates', {
			fields: ['start', 'end'],
			filter: { name: { _eq: 'Hitlist' } }
		})),
		directus.request(readItems('spotify_tracks'))
	])

	return {
		startDate: new Date(date.start ?? ''),
		endDate: new Date(date.end ?? ''),
		tracks,
	}
})

export default async function HistlistPage() {
	const data = await getData()
	return <HitlistForm tracks={data.tracks} startDate={data.startDate} endDate={data.endDate} />
}
