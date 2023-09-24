import { PollsHeader } from '@components/polls-header'
import dbConnect from '@lib/db'
import Dates from '@models/dates'

async function getData() {
	await dbConnect()
	const date = await Dates.findOne({ name: 'DJ Hunt' }, '-_id end start').lean()

	return {
		startDate: date?.start ?? new Date(),
		endDate: date?.end ?? new Date(),
	}
}

export default async function DJHuntlLayout({ children }: { children: React.ReactNode }) {
	const { startDate, endDate } = await getData()
	return (
		<>
			<PollsHeader name="DJ HUNT" root="/dj-hunt" start={startDate} end={endDate} />
			{children}
		</>
	)
}