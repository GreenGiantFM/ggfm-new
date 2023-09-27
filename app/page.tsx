import { SocialMediaBanner } from '@components/social-media-banner'
import type { Metadata } from 'next'
import styles from '@styles/Home.module.css'
import { FeaturedArticle } from '@components/featured-article'
import Link from 'next/link'
import { DJHuntBanner } from './dj-hunt-banner'
import Shows from '@components/swipers/shows'
import AOW from '@components/swipers/aow'
import RadioTalents from '@components/swipers/radio-talents'
import { directus } from '@lib/directus'
import { readItems, readSingleton } from '@directus/sdk'
import { DjTrainees } from '@directus-collections'
import { getEvents } from './events/get-events'
import { getBlogs } from './blogs/get-blogs'

async function getData() {
	const [talents, [event], [blog], [date], playlist, trainees, aow, shows] = await Promise.all([
		directus.request(readItems('radio_talents', {
			fields: ['name', 'nickname', 'image', 'writeup'],
			filter: { status: { _eq: 'published' } }
		})),
		getEvents(1, 1),
		getBlogs(1, 1),
		directus.request(readItems('dates', {
			fields: ['start', 'end'],
			filter: { name: { _eq: 'DJ Hunt' } }
		})),
		directus.request(readSingleton('misc', { fields: ['playlist_url'] })),
		directus.request(readItems('dj_trainees', {
			filter: { status: { _eq: 'published' } }
		})),
		directus.request(readItems('aow', {
			fields: ['image'],
			filter: { status: { _eq: 'published' } }
		})),
		directus.request(readItems('shows', {
			fields: ['name', 'image'],
			filter: { status: { _eq: 'published ' } }
		}))
	])

	return {
		talents: talents,
		event,
		blog,
		startDate: new Date(date.start ?? ''),
		endDate: new Date(date.end ?? ''),
		playlist: playlist.playlist_url,
		trainees,
		aow,
		shows,
	}
}

export const metadata: Metadata = {
	title: 'Home | Green Giant FM'
}

export default async function Home() {
	const { talents, event, blog, startDate, endDate, playlist, trainees, aow, shows } = await getData()

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
						category="BLOGS & PODCASTS"
						title={blog.title}
						image={process.env.NEXT_PUBLIC_ASSETS_URL + blog.image}
						excerpt={blog.body}
						url={'/blogs' + blog.id}
					/>
					<FeaturedArticle
						category="EVENTS"
						title={event.title}
						image={process.env.NEXT_PUBLIC_ASSETS_URL + event.image}
						excerpt={event.body}
						url={'/events' + blog.id}
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
							<AOW images={aow} />
						</div>
					</article>
				</div>
			</section>
			<section className="bg-neutral-700 overflow-hidden">
				<h1 className="text-center mb-4">SHOWS</h1>
				<Shows shows={shows} />
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
