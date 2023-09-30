import { DJVotingForm } from './voting-form'
import { directus } from '@lib/directus'
import { readItems } from '@directus/sdk'
import { DjTrainees } from '@directus-collections'
import { cache } from 'react'

export const metadata = {
	title: 'DJ Hunt',
	description: 'Voting polls for voting the next Green Giant FM DJ!',
}

const getData = cache(async () => {
	const [trainees, [date]] = await Promise.all([
		directus.request(readItems('dj_trainees')),
		directus.request(readItems('dates', {
			fields: ['start', 'end'],
			filter: { name: { _eq: 'DJ Hunt' } }
		}))
	])

	return {
		trainees: trainees as Array<DjTrainees>,
		startDate: new Date(date.start ?? ''),
		endDate: new Date(date.end ?? ''),
	}
})

// TODO: Convert back to static props after testing
export default async function DJHuntPage() {
	const { trainees, endDate, startDate } = await getData()
	return <DJVotingForm trainees={trainees} startDate={startDate} endDate={endDate} />
}
