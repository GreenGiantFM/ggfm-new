import DJTrainee from '@models/dj-trainee'
import dbConnect from '@lib/db'
import Dates from '@models/dates'
import { DJVotingForm } from './voting-form'

export const metadata = {
	title: 'DJ Hunt',
	description: 'Voting polls for voting the next Green Giant FM DJ!',
}

async function getData() {
	await dbConnect()
	const [trainees, date] = await Promise.all([
		DJTrainee.find().lean(),
		Dates.findOne({ name: 'DJ Hunt' }, '-_id end start').lean()
	])

	return {
		trainees: trainees.map(t => ({ ...t, _id: t._id.toString() })),
		startDate: date?.start ?? new Date(),
		endDate: date?.end ?? new Date(),
	}
}

// TODO: Convert back to static props after testing
export default async function DJHuntPage() {
	const { trainees, endDate, startDate } = await getData()
	return <DJVotingForm trainees={trainees} startDate={startDate} endDate={endDate} />
}
