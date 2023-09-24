import { PollsHeader } from '@components/polls-header'
import dbConnect from '@lib/db'
import Dates from '@models/dates'

async function getData() {
	await dbConnect()
	const date = await Dates.findOne({ name: 'Hitlist' }, '-_id end start').lean()

	return {
		startDate: date?.start ?? new Date(),
		endDate: date?.end ?? new Date(),
	}
}

export default async function HitlistLayout({ children }: { children: React.ReactNode }) {
	const { startDate, endDate } = await getData()
	return (
		<>
			<PollsHeader name="HITLIST" root="/hitlists" start={startDate} end={endDate} showPolls />
			{children}
		</>
	)
}