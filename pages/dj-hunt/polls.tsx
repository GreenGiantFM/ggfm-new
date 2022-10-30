import { fetcher } from '@lib/axios-config'
import dbConnect from '@lib/db'
import { IDJTrainee } from '@models/dj-trainee'
import { InferGetStaticPropsType, NextPage } from 'next'
import { useMemo } from 'react'
import useSWR from 'swr'
import Dates from '@models/dates'
import { DJHuntHeader } from '@components/dj-hunt-header'
import CustomHead from '@components/head'
import styles from '@styles/Hunt.module.css'
import Image from 'next/future/image'

type PollResult = Pick<IDJTrainee, '_id' | 'nickname' | 'image'> & {
	count: number
}

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ endDate }) => {
	const { data } = useSWR<PollResult[]>('/api/dj-hunt/votes', fetcher)
	const total = useMemo(() => data?.reduce((sum, a) => sum + a.count, 0), [data])

	return (
		<>
			<DJHuntHeader endDate={new Date(endDate ?? '')} />
			<CustomHead
				title={`${process.env.NEXT_PUBLIC_SITE_TITLE} | DJ Hunt Polls`}
				description="DJ hunt vote tally"
				url="/dj-hunt/polls"
			/>
			<div className="max-w-xl mx-auto w-full py-8 px-4">
				<h1 className="text-3xl text-right mb-6">Total Votes: {total}</h1>
				<div className="space-y-6">
					{
						data?.map(d => (
							<div key={d._id.toString()} className={styles.result}>
								<div className="w-16 aspect-square">
									<Image
										alt={`DJ ${d.nickname}`}
										src={`https://drive.google.com/uc?export=view&id=${d.image}`}
										className="object-cover w-full h-full block rounded-full"
										width={100} height={100}
									/>
								</div>
								<div className={styles.info}>
									<p>DJ {d.nickname}</p>
									<div>
										<div className={styles['progress-container']}>
											<progress max={total} value={d.count} />
											<p>{Math.round(d.count / (total ?? 1) * 100)}</p>
										</div>
										<p>{d.count}</p>
									</div>
								</div>
							</div>
						))
					}
				</div>
			</div>
		</>
	)
}

export default Page

export const getStaticProps = async () => {
	await dbConnect()
	const date = await Dates.findOne({ name: 'DJ Hunt' }, '-_id end').lean()
	return {
		props: {
			endDate: date?.end.toString()
		}
	}
}