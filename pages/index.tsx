import CustomHead from '@components/head'
import SocialMediaBanner from '@components/social-media-banner'
import type { NextPage, InferGetStaticPropsType } from 'next'
import styles from '@styles/Home.module.css'
import { BorderedLink } from '@components/bordered-button/'
import dynamic from 'next/dynamic'
import dbConnect from '@lib/db'
import RadioTalent from '@models/radio-talent'
import { getFirstFileData } from '@lib/posts'
import { EventData } from './api/events'
import { BlogData } from './api/blogs'
import { FeaturedArticle } from '@components/featured-article'
import Dates from '@models/dates'
import { useMemo } from 'react'
import { useCountdown } from '@lib/useCountdown'
import Link from 'next/link'
import Misc from '@models/misc'
import DJTrainee from '@models/dj-trainee'

const Shows = dynamic(() => import('@components/swipers/shows'))
const DJHunt = dynamic(() => import('@components/swipers/dj-hunt'))
const AOW = dynamic(() => import('@components/swipers/aow'))
const RadioTalents = dynamic(() => import('@components/swipers/radio-talents'))

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ talents, event, blog, startDate, endDate, playlist, trainees }) => {
	const start = useMemo(() => new Date(startDate), [startDate])
	const end = useMemo(() => new Date(endDate), [endDate])

	const startCountdown = useCountdown(start)
	const endCountdown = useCountdown(end)

	const diff = useMemo(() => endCountdown - startCountdown, [startCountdown, endCountdown])

	return (
		<div className={styles.home}>
			<CustomHead
				title={`${process.env.NEXT_PUBLIC_SITE_TITLE} | Home`}
				description="Green Giant FM homepage"
				url="/"
			/>
			{
				startCountdown <= 0 && endCountdown > 0 &&
				<section className="bg-neutral-800 !py-12 !px-4 overflow-hidden">
					<h1 className="text-center text-stroke-primary-dark sm:text-stroke-md text-stroke-sm font-bold !text-8xl !sm:text-9xl">DJ HUNT 2022</h1>
					<progress className="w-full block rounded-full" value={1 - (endCountdown / diff)} />
					<DJHunt className="my-6 !py-4 select-none" images={trainees.map(t => ({
						src: `https://lh3.googleusercontent.com/d/${t.image}`,
						alt: t.nickname,
					}))} />
					<BorderedLink href="/dj-hunt" className="max-w-64 hover:(bg-white text-gray-900 font-bold)">Vote Now</BorderedLink>
				</section>
			}
			<section className="bg-neutral-900 text-center !py-4">
				<h1>LATEST NEW & UPDATES</h1>
				<p className={styles.subtitle}>PODCASTS, BLOGS, EVENTS AND MORE</p>
			</section>
			<section>
				<div className={styles.updates}>
					<FeaturedArticle
						category="BLOGS & PODCASTS"
						title={blog.title}
						image={blog.featured_image}
						excerpt={blog.excerpt}
						url="/blogs"
					/>
					<FeaturedArticle
						category="EVENTS"
						title={event.title}
						image={event.featured_image}
						excerpt={event.excerpt}
						url="/events"
					/>
				</div>
			</section>
			<section className="bg-neutral-900">
				<div className="grid md:grid-cols-2 py-8 gap-y-8 px-4 sm:px-0 container mx-auto">
					<article className="flex flex-col items-center space-y-4 md:border-r border-neutral-700 px-0 md:px-6 xl:px-0">
						<h2>THE HITLIST</h2>
						<div className="w-full h-96 md:h-full relative">
							<iframe
								title="GGFM's spotify playlist"
								className="rounded-lg max-w-lg !aspect-square w-full h-full absolute transform left-1/2 -translate-x-1/2"
								src={`${playlist}?utm_source=generator&theme=1`}
								allow="autoplay;clipboard-write;encrypted-media;fullscreen;picture-in-picture"
							/>
						</div>
					</article>
					<article className="text-center space-y-4 h-[fit-content] sm:h-auto px-0 md:px-6 xl:px-0">
						<h2>ARTIST OF THE WEEK</h2>
						<div className="grid place-items-center">
							<AOW images={[
								{
									src: 'https://lh3.googleusercontent.com/d/1v_Qqz19l6W4rgkcKkK27TZ9oRSroYCdR',
									alt: "Picture of Purples N' Oranges",
								},
								{
									src: 'https://lh3.googleusercontent.com/d/1_a3MIe_j1NK75SW6iFcMZRXzKCie93oo',
									alt: "Description of Purples N' Oranges",
								},
								{
									src: 'https://lh3.googleusercontent.com/d/1zzkgC6F0yS8_taNxduWaggSK_Dib2k0z',
									alt: "Spotify barcode of Purples N' Oranges",
								},
								{
									src: 'https://lh3.googleusercontent.com/d/13WDYH-3bsTSgzGyF9g6kzZlL2Gmi2tWd',
									alt: "Pizza Grigliata Sponsor",
								}
							]} />
						</div>
					</article>
				</div>
			</section>
			<section className="bg-neutral-700 overflow-hidden">
				<h1 className="text-center mb-4">SHOWS</h1>
				<Shows images={[
					{ src: '/images/shows/reel-deal.png', alt: "Reel Deal" },
					{ src: '/images/shows/gamehub.png', alt: "Game Hub 1" },
					{ src: '/images/shows/reel-deal.png', alt: "Reel Deal 1" },
					{ src: '/images/shows/gamehub.png', alt: "Game Hub 2" },
					{ src: '/images/shows/reel-deal.png', alt: "Reel Deal 2" },
					{ src: '/images/shows/gamehub.png', alt: "Game Hub 3" },
				]} />
			</section>
			<section className="bg-secondary text-neutral-900 !px-0">
				<div className="text-center">
					<Link href="/radio-talents">
						<a className="hover:underline underline-2">
							<h1>RADIO TALENTS</h1>
						</a>
					</Link>
					<p className="subtitle">THE FACES AND VOICES OF GREEN GIANT</p>
					<RadioTalents
						images={talents.map(t => ({ src: t.image, alt: `Photo of DJ ${t.nickname}` }))}
						className="container h-full !pt-8 !pb-16"
					/>
				</div>
			</section>
			<SocialMediaBanner />
		</div >
	)
}

export default Home

export const getStaticProps = async () => {
	await dbConnect()

	const [talents, event, blog, dates, playlist, trainees] = await Promise.all([
		RadioTalent.find({}).lean(),
		getFirstFileData<EventData>(['posts', 'events']),
		getFirstFileData<BlogData>(['posts', 'blogs']),
		Dates.findOne({ name: 'DJ Hunt' }, '-_id start end').lean(),
		Misc.findOne({ name: 'playlist' }, '-_id data').lean(),
		DJTrainee.find({}, '-_id').lean()
	])

	return {
		props: {
			talents: talents.map(t => ({ ...t, _id: t._id.toString() })),
			event,
			blog,
			startDate: dates?.start.toString() ?? '',
			endDate: dates?.end.toString() ?? '',
			playlist: playlist?.data ?? '',
			trainees,
		}
	}
}
