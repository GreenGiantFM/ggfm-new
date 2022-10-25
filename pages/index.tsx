import CustomHead from '@components/head'
import SocialMediaBanner from '@components/social-media-banner'
import type { NextPage, InferGetStaticPropsType } from 'next'
import styles from '@styles/Home.module.css'
import Image from 'next/future/image'
import { BorderedButton, BorderedLink } from '@components/bordered-button/'
import dynamic from 'next/dynamic'
import dbConnect from '@lib/db'
import RadioTalent from '@models/radio-talent'

const Shows = dynamic(() => import('@components/swipers/shows'))
const DJHunt = dynamic(() => import('@components/swipers/dj-hunt'))
const AOW = dynamic(() => import('@components/swipers/aow'))
const RadioTalents = dynamic(() => import('@components/swipers/radio-talents'))

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ talents }) => {
	return (
		<div className={styles.home}>
			<CustomHead
				title={`${process.env.NEXT_PUBLIC_SITE_TITLE} | Home`}
				description="Green Giant FM homepage"
				url="/"
			/>
			<section className="bg-neutral-800 !py-12 !px-4 overflow-hidden">
				<h1 className="text-center fill text-stroke-primary-dark text-stroke-md font-bold !text-8xl">DJ HUNT</h1>
				<progress className="w-full block rounded-full" value={0.8} />
				<DJHunt className="my-4 !py-4 select-none" images={[
					{ alt: 'Xavier', src: '/images/xavier.jpg' },
					{ alt: 'Xavier 1', src: '/images/xavier.jpg' },
					{ alt: 'Xavier 2', src: '/images/xavier.jpg' },
					{ alt: 'Xavier 3', src: '/images/xavier.jpg' },
					{ alt: 'Xavier 4', src: '/images/xavier.jpg' },
					{ alt: 'Xavier 5', src: '/images/xavier.jpg' },
				]} />
				<BorderedButton>Vote Now</BorderedButton>
			</section>
			<section className="bg-neutral-900 text-center !py-4">
				<h1>LATEST NEW & UPDATES</h1>
				<p className={styles.subtitle}>PODCASTS, BLOGS, EVENTS AND MORE</p>
			</section>
			<section>
				<div className={styles.updates}>
					<article>
						<h2>PODCAST & BLOGS</h2>
						<Image src="/images/sample.png" alt="What's up bro" className="w-full h-auto" width={383} height={311} priority={true} />
						<h3>What&apos;s Up, Bro?</h3>
						<p>
							Been hooked on tiktok? Or want a blast from the past.
							Well, tune in with DJ Julie, Ella, and Jamie as they talk about Been hooked on tiktok?
							Or want a blast from the past. Well, tune in with DJ Julie, Ella, and Jamie as they talk about
						</p>
						<BorderedLink href="/blogs" className={styles['see-more']}>Blogs</BorderedLink>
					</article>
					<article>
						<h2>EVENTS</h2>
						<Image src="/images/sample.png" alt="What's up bro" className="w-full h-auto" width={383} height={311} priority={true} />
						<h3>What&apos;s Up, Bro?</h3>
						<p>
							Been hooked on tiktok? Or want a blast from the past.
							Well, tune in with DJ Julie, Ella, and Jamie as they talk about Been hooked on tiktok?
							Or want a blast from the past. Well, tune in with DJ Julie, Ella, and Jamie as they talk about
						</p>
						<BorderedLink href="/events" className={styles['see-more']}>Events</BorderedLink>
					</article>
					<article>
						<h2>LIFESTYLE</h2>
						<Image src="/images/sample.png" alt="What's ups bro" className="w-full h-auto" width={383} height={311} priority={true} />
						<h3>What&apos;s Up, Bro?</h3>
						<p className="subtitle">
							Been hooked on tiktok? Or want a blast from the past.
							Well, tune in with DJ Julie, Ella, and Jamie as they talk about Been hooked on tiktok?
							Or want a blast from the past. Well, tune in with DJ Julie, Ella, and Jamie as they talk about
						</p>
						<BorderedLink href="/lifestyle" className={styles['see-more']}>Lifestyle</BorderedLink>
					</article>
				</div>
			</section>
			<section className="bg-neutral-900">
				<div className="grid md:grid-cols-2 py-8 gap-y-8 px-4 sm:px-0 container mx-auto">
					<article className="grid gap-y-4 place-items-center md:border-r border-neutral-700 px-0 md:px-6 xl:px-0">
						<h2>THE HITLIST</h2>
						<iframe
							title="GGFM's spotify playlist"
							className="rounded-lg max-w-lg !aspect-square"
							width="100%"
							height="435"
							src="https://open.spotify.com/embed/playlist/4faFfX3ONpaFhDb5Kxb95V?utm_source=generator&theme=1"
							allow="autoplay;clipboard-write;encrypted-media;fullscreen;picture-in-picture"
						/>
					</article>
					<article className="text-center space-y-4 h-[fit-content] sm:h-auto px-0 md:px-6 xl:px-0">
						<h2>ARTIST OF THE WEEK</h2>
						<div className="grid place-items-center">
							<AOW images={[
								{
									src: 'https://drive.google.com/uc?export=view&id=1v_Qqz19l6W4rgkcKkK27TZ9oRSroYCdR',
									alt: "Picture of Purples N' Oranges",
								},
								{
									src: 'https://drive.google.com/uc?export=view&id=1_a3MIe_j1NK75SW6iFcMZRXzKCie93oo',
									alt: "Description of Purples N' Oranges",
								},
								{
									src: 'https://drive.google.com/uc?export=view&id=1zzkgC6F0yS8_taNxduWaggSK_Dib2k0z',
									alt: "Spotify barcode of Purples N' Oranges",
								},
								{
									src: 'https://drive.google.com/uc?export=view&id=13WDYH-3bsTSgzGyF9g6kzZlL2Gmi2tWd',
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
					<h1>RADIO TALENTS</h1>
					<p className="subtitle">THE FACES AND VOIDES OF GREEN GIANT</p>
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
	const talents = await RadioTalent.find({}).lean()

	return {
		props: {
			talents: talents.map(t => ({ ...t, _id: t._id.toString() }))
		}
	}
}
