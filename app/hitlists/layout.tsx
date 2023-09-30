import { PollsHeader } from '@components/polls-header'
import { readItems } from '@directus/sdk'
import { directus } from '@lib/directus'
import { cache } from 'react'

export const revalidate = 20 // remove when revalidatePath is fixed

const getData = cache(async () => {
	const [date] = await directus.request(readItems('dates', {
		fields: ['start', 'end'],
		filter: { name: { _eq: 'Hitlist' } }
	}))

	return {
		startDate: new Date(date.start ?? ''),
		endDate: new Date(date.end ?? ''),
	}
})

export default async function HitlistLayout({ children }: { children: React.ReactNode }) {
	const { startDate, endDate } = await getData()
	return (
		<>
			<PollsHeader name="HITLIST" root="/hitlists" start={startDate} end={endDate} showPolls />
			{children}
		</>
	)
}