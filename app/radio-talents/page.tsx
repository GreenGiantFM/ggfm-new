import dbConnect from '@lib/db'
import RadioTalent from '@models/radio-talent'
import { TalentSlider } from './talent-slider'

export const metadata = {
	title: 'Radio Talents',
	description: 'The faces and voices of Green Giant FM'
}

async function getData() {
	await dbConnect()
	const talents = await RadioTalent.find({}).lean()

	return talents.map(t => ({ ...t, _id: t._id.toString() }))
}

export default async function RadioTalentsPage() {
	const talents = await getData()

	return (
		<section className="bg-secondary pt-8 flex flex-col">
			<h1 className="text-4xl sm:text-5xl text-neutral-800 text-center">MEET THE DJ&apos;S OF GREEN GIANT FM</h1>
			<h2 className="font-secondary text-neutral-700 text-center text-sm sm:text-base">THE FACES AND VOICES OF GREEN GIANT</h2>
			<TalentSlider talents={talents} />
		</section>
	)
}
