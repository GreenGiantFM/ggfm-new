import CustomHead from '@components/head'
import { NextPage } from 'next'
import Image from 'next/future/image'
import { POOLS } from '@lib/pools'
import { Carousel } from '@components/carousel'

const OFFICERS = [
	{ name: 'President', director: 'Krizzia Garcia' },
	{ name: 'Vice President for Internal Affairs', director: 'Miguel Lindog' },
	{ name: 'Vice President for External Affairs', director: 'Zerwa Mughal' },
	...POOLS.map(pool => ({ name: pool.name, director: pool.director })),
	{ name: 'VPI Training Manager', director: 'Alyssa Fuentes' },
	{ name: 'VPI Formations Manager', director: 'Juan Campos' },
]

const Page: NextPage = () => {
	return (
		<>
			<CustomHead
				title={`${process.env.NEXT_PUBLIC_SITE_TITLE} | About Us`}
				description="About Green Giant FM, DLSU's Radio Station"
				url="/about-us"
			/>
			<section className="bg-neutral-800 md:px-0 space-y-4 w-full" style={{ maxHeight: 'calc(100vh - 4rem)' }}>
				<Carousel className="bg-neutral-700 mx-auto min-h-xs max-h-full" style={{ aspectRatio: '3/2' }}
					images={[
						{
							url: 'https://drive.google.com/uc?export=view&id=1GgH04MtunOICbvM0T-jdGywSdal3EwDN',
							alt: "Picture of Purples N' Oranges",
						},
						{
							url: 'https://drive.google.com/uc?export=view&id=130SB43ZpK3QaGTjwVO6fEAALc1rbupgB',
							alt: "Picture of Purples N' Oranges",
						},
						{
							url: 'https://drive.google.com/uc?export=view&id=1NjZaW3CvRqRhiH6r-OlGVoD9VZnLLfci',
							alt: "Picture of Purples N' Oranges",
						},
						{
							url: 'https://drive.google.com/uc?export=view&id=1p-i0x1gO-H1_V71OL-dETZq6I_j56al3',
							alt: "Picture of Purples N' Oranges",
						},
					]}
				>
					<div className="absolute bottom-0 pt-6 pb-10 w-full px-4"
						style={{ background: 'linear-gradient(rgba(25,25,25,0.0),rgba(25,25,25,0.8) 20%,rgba(25,25,25,0.8))' }}>
						<p className="mx-auto max-w-prose text-xs sm:text-sm md:text-base">
							Green Giant FM (GGFM) is De La Salle University-Manila&apos;s Official Radio Station,
							located at Br. Bloemen Hall. Green Giant FM broadcasts live on Tuesdays and Thursdays from 7:30 AM to 9:15 PM,
							and on Wednesdays and Fridays from 7:30 AM to 4:00 PM.
						</p>
					</div>
				</Carousel>
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

export default Page
