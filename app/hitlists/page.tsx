import dbConnect from '@lib/db'
import Dates from '@models/dates'
import Track from '@models/track'
import { HitlistForm } from './hitlist-form'

export const metadata = {
	title: 'Hitlist',
	description: "Voting polls for this week's GGFM's Top 20!",
}

async function getData() {
	await dbConnect()
	const [tracks, date] = await Promise.all([
		Track.find({}).lean(),
		Dates.findOne({ name: 'Hitlist' }, '-_id end start').lean()
	])

	return {
		tracks,
		startDate: date?.start ?? new Date(),
		endDate: date?.end ?? new Date(),
	}
}

export default async function HistlistPage() {
	const { tracks, startDate, endDate } = await getData()
	return <HitlistForm tracks={tracks} startDate={startDate} endDate={endDate} />
}
