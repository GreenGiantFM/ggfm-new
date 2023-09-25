import SocialMediaBanner from '@components/social-media-banner'
import type { Metadata } from 'next'
import styles from '@styles/Home.module.css'
import { getFirstFileData } from '@lib/posts'
import { EventData } from './events/api/route'
import { BlogData } from './blogs/api/route'
import { FeaturedArticle } from '@components/featured-article'
import Link from 'next/link'
import { DJHuntBanner } from './dj-hunt-banner'
import Shows from '@components/swipers/shows'
import AOW from '@components/swipers/aow'
import RadioTalents from '@components/swipers/radio-talents'
import { directus } from '@lib/directus'
import { readItems, readSingleton } from '@directus/sdk'
import { DjTrainees } from '@directus-collections'

async function getData() {
	const [talents, event, blog, [date], playlist, trainees] = await Promise.all([
		directus.request(readItems('radio_talents', {
			fields: ['name', 'nickname', 'image', 'writeup'],
			filter: { status: { _eq: 'published' } }
		})),
		getFirstFileData<EventData>(['posts', 'events']),
		getFirstFileData<BlogData>(['posts', 'blogs']),
		directus.request(readItems('dates', {
			fields: ['start', 'end'],
			filter: { name: { _eq: 'DJ Hunt' } }
		})),
		directus.request(readSingleton('playlist', {
			fields: ['url']
		})),
		directus.request(readItems('dj_trainees')),
	])

	return {
		talents: talents,
		event,
		blog,
		startDate: new Date(date.start ?? ''),
		endDate: new Date(date.end ?? ''),
		playlist: playlist.url,
		trainees,
	}
}

export const metadata: Metadata = {
	title: 'Home | Green Giant FM'
}

export default async function Home() {
	const { talents, event, blog, startDate, endDate, playlist, trainees } = await getData()

	return (
		<div className={styles.home}>
			<DJHuntBanner start={startDate} end={endDate} trainees={trainees as DjTrainees[]} />
			<section className="bg-neutral-900 text-center !py-4">
				<h1>LATEST NEW & UPDATES</h1>
				<p className={styles.subtitle}>PODCASTS, BLOGS, EVENTS AND MORE</p>
			</section>
			<section>
				<div className={styles.updates}>
					<FeaturedArticle
						id={blog!.id}
						category="BLOGS & PODCASTS"
						title={blog!.title}
						image={blog!.featured_image}
						excerpt={blog!.excerpt}
						url="/blogs"
					/>
					<FeaturedArticle
						id={event!.id}
						category="EVENTS"
						title={event!.title}
						image={event!.featured_image}
						excerpt={event!.excerpt}
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
					<Link href="/radio-talents" className="hover:underline underline-2">
						<h1>RADIO TALENTS</h1>
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
