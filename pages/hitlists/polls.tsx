import { fetcher } from '@lib/axios-config'
import dbConnect from '@lib/db'
import { InferGetStaticPropsType, NextPage } from 'next'
import { useMemo } from 'react'
import useSWR from 'swr'
import Dates from '@models/dates'
import { PollsHeader } from '@components/polls-header'
import CustomHead from '@components/head'
import styles from '@styles/Hunt.module.css'
import Image from 'next/future/image'
import { ITrack } from '@models/track'

type PollResult = ITrack & {
	count: number
}

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ endDate }) => {
	const { data } = useSWR<PollResult[]>('/api/hitlists/votes', fetcher)
	const total = useMemo(() => data?.reduce((sum, a) => sum + a.count, 0), [data])

	return (
		<>
			<PollsHeader name="HITLIST" root="/hitlists" endDate={new Date(endDate ?? '')} />
			<CustomHead
				title={`${process.env.NEXT_PUBLIC_SITE_TITLE} | Hitlist Polls`}
				description="Hitlist poll tally"
				url="/hitlists/polls"
			/>
			<div className="max-w-xl mx-auto w-full py-8 px-4">
				<h1 className="text-3xl text-right mb-6">Total Votes: {total}</h1>
				<div className="space-y-6">
					{
						data?.map(t => (
							<div key={t._id.toString()} className={styles.result}>
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
		</>
	)
}

export default Page

export const getStaticProps = async () => {
	await dbConnect()
	const date = await Dates.findOne({ name: 'Hitlist' }, '-_id end').lean()
	return {
		props: {
			endDate: date?.end.toString()
		}
	}
}