import { PollsHeader } from '@components/polls-header'
import { readItems } from '@directus/sdk'
import { directus } from '@lib/directus'
import { cache } from 'react'
import { USE_MOCK_DATA, mockDirectusClient } from '@lib/mock-directus'

export const revalidate = 0 // remove when revalidatePath is fixed

const getData = cache(async () => {
	let date;
	
	if (USE_MOCK_DATA) {
		const dates = await mockDirectusClient.readItems('dates', {
			fields: ['start', 'end'],
			filter: { name: { _eq: 'DJ Hunt' } }
		});
		date = dates[0] as any;
	} else {
		const dates = await directus.request(readItems('dates' as any, {
			fields: ['start', 'end'],
			filter: { name: { _eq: 'DJ Hunt' } }
		})) as any[];
		date = dates[0];
	}

	return {
		startDate: new Date(date.start ?? ''),
		endDate: new Date(date.end ?? ''),
	}
})

export default async function DJHuntlLayout({ children }: { children: React.ReactNode }) {
	const { startDate, endDate } = await getData()
	return (
		<>
			<PollsHeader name="DJ HUNT" root="/dj-hunt" start={startDate} end={endDate} />
			{children}
		</>
	)
}