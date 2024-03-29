import { PollsHeader } from '@components/polls-header'
import { readItems } from '@directus/sdk'
import { directus } from '@lib/directus'
import { cache } from 'react'

export const revalidate = 0 // remove when revalidatePath is fixed

const getData = cache(async () => {
	const [date] = await directus.request(readItems('dates', {
		fields: ['start', 'end'],
		filter: { name: { _eq: 'DJ Hunt' } }
	}))

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