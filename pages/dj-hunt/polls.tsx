import { fetcher } from '@lib/axios-config'
import dbConnect from '@lib/db'
import { IDJTrainee } from '@models/dj-trainee'
import { InferGetStaticPropsType, NextPage } from 'next'
import { useMemo } from 'react'
import useSWR from 'swr'
import Dates from '@models/dates'
import { PollsHeader } from '@components/polls-header'
import CustomHead from '@components/head'
import styles from '@styles/Hunt.module.css'
import Image from 'next/future/image'
import { LoadingSpinner } from '@components/loading-spinner'

type PollResult = Pick<IDJTrainee, '_id' | 'nickname' | 'image'> & {
	count: number
}

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ endDate }) => {
	const { data, error } = useSWR<PollResult[]>('/api/dj-hunt/votes', fetcher)
	const total = useMemo(() => data?.reduce((sum, a) => sum + a.count, 0), [data])

	return (
		<>
			<PollsHeader name="DJ HUNT" root="/dj-hunt" endDate={new Date(endDate ?? '')} />
			<CustomHead
				title={`${process.env.NEXT_PUBLIC_SITE_TITLE} | DJ Hunt Polls`}
				description="DJ hunt vote tally"
				url="/dj-hunt/polls"
			/>
			<div className="max-w-xl mx-auto w-full pt-12 pb-16 space-y-4 px-4">
				<h1 className="text-3xl text-right">Total Votes: {total ?? 0}</h1>
				{
					error ?
						<p>An error has occurred!</p>
						:
						data ?
							<div className="space-y-6">
								{
									data?.map(d => (
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
							:
							<LoadingSpinner />
				}
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