import dbConnect from '@lib/db'
import { IDJTrainee } from '@models/dj-trainee'
import styles from '@styles/Hunt.module.css'
import Image from 'next/image'
import DJTrainee from '@models/dj-trainee'

type PollResult = Pick<IDJTrainee, '_id' | 'nickname' | 'image'> & {
	count: number
}

export const revalidate = 0

export const metadata = {
	title: 'DJ Hunt Polls',
	description: 'DJ hunt vote tally',
}

async function getData() {
	await dbConnect()
	const data = await DJTrainee.aggregate()
		.lookup({
			from: 'huntvotes',
			localField: '_id',
			foreignField: 'candidate',
			as: 'votes'
		})
		.addFields({
			count: { $size: '$votes' }
		})
		.project({ count: 1, nickname: 1, image: 1 })
		.sort({ count: -1, nickname: 1 })

	return data as PollResult[]
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
						<div key={d._id.toString()} className={styles.result}>
							<div className="w-16 aspect-square">
								<Image
									alt={`DJ ${d.nickname}`}
									src={`https://lh3.googleusercontent.com/d/${d.image}`}
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
