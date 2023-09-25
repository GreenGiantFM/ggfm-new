import { aggregate, readItems } from '@directus/sdk'
import { directus } from '@lib/directus'
import styles from '@styles/Hunt.module.css'
import Image from 'next/image'

export const revalidate = 0

export const metadata = {
	title: 'DJ Hunt Polls',
	description: 'DJ hunt vote tally',
}

async function getData() {
	const [voteCounts, trainees] = await Promise.all([
		directus.request(aggregate('hunt_votes', {
			aggregate: { count: '*' },
			groupBy: ['candidate'],
		})),
		directus.request(readItems('dj_trainees'))
	])

	const concat = trainees.map(t => ({
		...t,
		count: (voteCounts.find(v => v.candidate === t.id)?.count ?? 0) as number
	}))
	concat.sort((a, b) => b.count - a.count)
	return concat
}

export default async function DJHuntPollsPage() {
	const data = await getData()
	const total = data.reduce((sum, a) => sum + a.count, 0)

	return (
		<div className="max-w-xl mx-auto w-full pt-12 pb-16 space-y-4 px-4">
			<h1 className="text-3xl text-right">Total Votes: {total ?? 0}</h1>
			<div className="space-y-6">
				{
					data.map(d => (
						<div key={d.id} className={styles.result}>
							<div className="w-16 aspect-square">
								<Image
									alt={`DJ ${d.nickname}`}
									src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${d.image}`}
									className="object-cover w-full h-full block rounded-full"
									width={100} height={100}
								/>
							</div>
							<div className={styles.info}>
								<p>DJ {d.nickname}</p>
								<div>
									<div className={styles['progress-container']}>
										<progress max={total} value={d.count} />
										<p>{Math.round(d.count / (total ? total : 1) * 100)}</p>
									</div>
									<p>{d.count}</p>
								</div>
							</div>
						</div>
					))
				}
			</div>
		</div>
	)
}
