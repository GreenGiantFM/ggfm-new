import { TalentSlider } from './talent-slider'
import { directus } from '@lib/directus'
import { readItems } from '@directus/sdk'
import { cache } from 'react'

export const metadata = {
	title: 'Radio Talents',
	description: 'The faces and voices of Green Giant FM'
}

export const revalidate = 20 // remove when revalidatePath is fixed

const getData = cache(async () => {
	return await directus.request(readItems('radio_talents', {
		fields: ['name', 'nickname', 'image', 'writeup'],
		filter: { status: { _eq: 'published' } }
	}))
})

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
