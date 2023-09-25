import Image from 'next/image'
import AboutSwiper from '@components/swipers/about-swiper'
import { directus } from '@lib/directus'
import { readItems, readSingleton } from '@directus/sdk'

export const metadata = {
	title: 'About Us'
}

async function getData() {
	const [pools, misc, highlights] = await Promise.all([
		directus.request(readItems('pools', {
			fields: ['name', 'image', 'director', 'description'],
			filter: { status: { _eq: 'published' } }
		})),
		directus.request(readSingleton('misc', {
			fields: ['vision', 'mission', 'hero_description']
		})),
		directus.request(readItems('highlights', {
			fields: ['image'],
			filter: { status: { _eq: 'published' } }
		})),
	])

	return { pools, misc, highlights }
}

export default async function AboutUs() {
	const { pools, misc, highlights } = await getData()

	return (
		<>
			<section className="bg-neutral-800 md:px-0 space-y-4" style={{ maxHeight: 'calc(100vh - 7rem)' }}>
				<AboutSwiper highlights={highlights} description={misc.hero_description} />
			</section>
			<section className="bg-neutral-900 px-4 py-12">
				<div className="grid md:grid-cols-2 max-w-6xl mx-auto gap-y-8 gap-x-16">
					<article>
						<h2 className="text-5xl text-center mb-4">Mission</h2>
						<p className="max-w-prose mx-auto">{misc.mission}</p>
					</article>
					<article>
						<h2 className="text-5xl text-center mb-4">Vision</h2>
						<p className="max-w-prose mx-auto">{misc.vision}</p>
					</article>
				</div>
			</section>
			<section className="py-12">
				<h2 className="text-5xl text-center mb-6">Executive Board</h2>
				<div className="grid place-items-center text-center gap-y-6 md:gap-y-4 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto">
					{pools.map(({ name, director }) => (
						<div key={name}>
							<p className="font-bold text-lg">{director}</p>
							<p>{name}</p>
						</div>
					))}
				</div>
			</section>
			<section className="py-12 px-4 md:px-8" style={{ background: 'linear-gradient(180deg, #191919 25.83%, #1C2713 91.46%)' }}>
				<h2 className="text-5xl text-center mb-8">Pools</h2>
				<div className="grid lg:grid-cols-2 place-items-center max-w-2xl lg:max-w-7xl gap-x-16 mx-auto gap-y-6">
					{
						pools.reduce((acc, pool) => {
							if (!pool.image) return acc

							acc.push(
								<div key={pool.name} className="contents">
									<div className="flex w-full space-x-4 items-center">
										<Image src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${pool.image}`} alt="" width={130} height={130} />
										<div>
											<h3 className="text-2xl mb-1">{pool.name}</h3>
											<p className="text-sm">{pool.description}</p>
										</div>
									</div>
								</div>
							)

							return acc
						}, [] as React.ReactNode[])
					}
				</div>
			</section>
		</>
	)
}
