import { DJVotingForm } from './voting-form'
import { directus } from '@lib/directus'
import { readItems } from '@directus/sdk'
import { DjTrainees } from '@directus-collections'
import { cache } from 'react'
import { USE_MOCK_DATA, mockDirectusClient } from '@lib/mock-directus'

export const metadata = {
	title: 'DJ Hunt',
	description: 'Voting polls for voting the next Green Giant FM DJ!',
}

export const revalidate = 0 // remove when revalidatePath is fixed

const getData = cache(async () => {
	let trainees, dates;
	
	if (USE_MOCK_DATA) {
		[trainees, dates] = await Promise.all([
			mockDirectusClient.readItems('dj_trainees'),
			mockDirectusClient.readItems('dates', {
				fields: ['start', 'end'],
				filter: { name: { _eq: 'DJ Hunt' } }
			})
		]);
	} else {
		[trainees, dates] = await Promise.all([
			directus.request(readItems('dj_trainees' as any)) as any,
			directus.request(readItems('dates' as any, {
				fields: ['start', 'end'],
				filter: { name: { _eq: 'DJ Hunt' } }
			})) as any
		]);
	}

	const date = (dates as any[])[0];

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
