import { aggregate, readItems } from '@directus/sdk'
import { directus } from '@lib/directus'
import styles from '@styles/Hunt.module.css'
import Image from 'next/image'

export const metadata = {
	title: 'Hitlist Polls',
	description: "Tally of Green Giant FM's Top 20",
}

export const revalidate = 0

async function getData() {
	const [voteCounts, tracks] = await Promise.all([
		directus.request(aggregate('track_votes', {
			aggregate: { count: '*' },
			groupBy: ['track'],
		})),
		directus.request(readItems('spotify_tracks'))
	])


	const concat = tracks.map(t => ({
		...t,
		count: (voteCounts.find(v => v.track === t.id)?.count ?? 0) as number
	}))
	concat.sort((a, b) => b.count - a.count)
	return concat
}

export default async function HitlistPollsPage() {
	const data = await getData()
	const total = data.reduce((sum, a) => sum + a.count, 0)

	return (
		<div className="max-w-xl mx-auto w-full pb-16 pt-12 px-4 space-y-4">
			<h1 className="text-3xl text-right">Total Votes: {total ?? 0}</h1>
			<div className="space-y-6">
				{
					data.map(t => (
						<div key={t.id} className={styles.result}>
							<div className="w-16 aspect-square">
								<Image
									alt={t.name}
									src={t.image}
									className="object-cover w-full h-full block rounded-full"
									width={100} height={100}
								/>
							</div>
							<div className={styles.info}>
								<p>{t.name}</p>
								<div>
									<div className={styles['progress-container']}>
										<progress max={total} value={t.count} />
										<p>{Math.round(t.count / (total ? total : 1) * 100)}</p>
									</div>
									<p>{t.count}</p>
								</div>
							</div>
						</div>
					))
				}
			</div>
		</div>
	)
}
