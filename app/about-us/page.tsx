import Image from 'next/image'
import { POOLS } from '@lib/pools'
import AboutSwiper from '@components/swipers/about-swiper'

export const metadata = {
	title: 'About Us'
}

const OFFICERS = [
	{ name: 'President', director: 'Krizzia Garcia' },
	{ name: 'Vice President for Internal Affairs', director: 'Miguel Lindog' },
	{ name: 'Vice President for External Affairs', director: 'Zerwa Mughal' },
	...POOLS.map(pool => ({ name: pool.name, director: pool.director })),
	{ name: 'VPI Training Manager', director: 'Alyssa Fuentes' },
	{ name: 'VPI Formations Manager', director: 'Juan Campos' },
]

export default function AboutUs() {
	return (
		<>
			<section className="bg-neutral-800 md:px-0 space-y-4" style={{ maxHeight: 'calc(100vh - 4rem)' }}>
				<AboutSwiper
					images={[
						{
							src: 'https://lh3.googleusercontent.com/d/1GgH04MtunOICbvM0T-jdGywSdal3EwDN',
							alt: 'Two people in the booth, one holding a microphone',
						},
						{
							src: 'https://lh3.googleusercontent.com/d/130SB43ZpK3QaGTjwVO6fEAALc1rbupgB',
							alt: 'Green Giant FM members wearing green and posing for a picture',
						},
						{
							src: 'https://lh3.googleusercontent.com/d/1NjZaW3CvRqRhiH6r-OlGVoD9VZnLLfci',
							alt: 'Performer playing a guitar inside the GGFM Booth',
						},
						{
							src: 'https://lh3.googleusercontent.com/d/1p-i0x1gO-H1_V71OL-dETZq6I_j56al3',
							alt: 'Green Giant fm members posing for a picture',
						},
					]}
				/>
			</section>
			<section className="bg-neutral-900 px-4 py-12">
				<div className="grid md:grid-cols-2 max-w-6xl mx-auto gap-y-8 gap-x-16">
					<article>
						<h2 className="text-5xl text-center mb-4">Mission</h2>
						<p className="max-w-prose mx-auto">
							DLSU Radio: Green Giant FM functions as a platform for students to broadcast their ideas on a
							variety of topics through several outlets and programs, a vehicle for student leaders to promote
							awareness of university functions, a partner for student organizations and external clients to
							publicize events, services, and products that students can rely on, a news outlet for students
							that is reliable, up to date, and reports on all types of news from entertainment to politics,
							and as a channel for the DLSU administration to announce significant updates to students.
						</p>
					</article>
					<article>
						<h2 className="text-5xl text-center mb-4">Vision</h2>
						<p className="max-w-prose mx-auto">
							DLSU Radio: Green Giant FM is an educational, non-profit, student-run organization that aims
							to be a premier college radio station by serving the Lasallian community and their listeners worldwide.
							Green Giant FM aims to provide entertaining and original content and broadcast accurate and
							reliable news. The organization is inspired by the Lasallian values of Faith, Zeal for Service,
							and Communion. It strives for consistent excellence in all endeavours in the field of Radio
							Communication and Entertainment as it evolves in a progressive world.
						</p>
					</article>
				</div>
			</section>
			<section className="py-12">
				<h2 className="text-5xl text-center mb-6">Executive Board</h2>
				<div className="grid place-items-center text-center gap-y-6 md:gap-y-4 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto">
					{OFFICERS.map(({ name, director }) => (
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
						POOLS.map(pool => (
							<div key={pool.name} className="contents">
								<div className="flex w-full space-x-4 items-center">
									<Image src={pool.image} alt={pool.alt} width={130} height={130} />
									<div>
										<h3 className="text-2xl mb-1">{pool.name}</h3>
										<p className="text-sm">{pool.description}</p>
									</div>
								</div>
							</div>
						))
					}
				</div>
			</section>
		</>
	)
}
