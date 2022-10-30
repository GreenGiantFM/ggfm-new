import CustomHead from '@components/head'
import { InferGetStaticPropsType, NextPage } from 'next'
import DJTrainee, { IDJTrainee } from '@models/dj-trainee'
import { DJTraineeItem, DJTraineeModal } from '@components/dj-trainee'
import { FormEventHandler, useState } from 'react'
import dbConnect from '@lib/db'
import { app } from '@lib/axios-config'
import { getAxiosError } from '@lib/utils'
import Script from 'next/script'
import Dates from '@models/dates'
import { DJHuntHeader } from '@components/dj-hunt-header'

export const SELECTION_KEY = 'selection'

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ trainees, endDate }) => {
	const [trainee, setTrainee] = useState<IDJTrainee>()
	const [error, setError] = useState('')
	const [email, setEmail] = useState('')

	const handleSubmit: FormEventHandler = async e => {
		e.preventDefault()
		const selection = new FormData(e.target as HTMLFormElement).getAll('selection')

		if (selection.length == 0) return setError('You have not selected any DJs!')

		try {
			if (!email) return setError('You are not logged in!')
			await app.post('/api/dj-hunt/votes', { email, selection })
			// TODO: Forward to live polls
		} catch (e) {
			setError(getAxiosError(e))
		}
	}

	function handleToken({ credential }: { credential: string }) {
		const data = JSON.parse(window.atob(credential.split('.')[1].replace('-', '+').replace('_', '/')))
		setEmail(data.email)
	}

	return (
		<>
			<DJHuntHeader endDate={new Date(endDate ?? '')} />
			<form className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 self-start container p-4 xl:px-8 2xl:px-32 mx-auto" onSubmit={handleSubmit}>
				<Script src="https://accounts.google.com/gsi/client" async defer
					onReady={() => {
						window.google.accounts.id.initialize({
							client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
							callback: handleToken
						})
						window.google.accounts.id.renderButton(document.getElementById("g-btn"), {
							shape: 'pill',
						})
					}}
				/>
				<CustomHead
					title={`${process.env.NEXT_PUBLIC_SITE_TITLE} | DJ Hunt`}
					description="Voting polls for voting the next Green Giant FM DJ!"
					url="/dj-hunt"
				/>
				{trainees.map((t, i) => (
					<DJTraineeItem
						key={t._id}
						_id={t._id}
						nickname={t.nickname}
						segue={t.segue}
						image={t.image}
						onMore={() => setTrainee(trainees[i])}
						onVote={() => setError('')}
					/>
				))}
				<DJTraineeModal
					isOpen={trainee != undefined}
					close={() => setTrainee(undefined)}
					{...trainee}
				/>
				{
					email ?
						<div className="col-span-full mx-auto w-full max-w-xs text-center space-y-2">
							<button className="btn white text-center rounded-full py-2 text-xl tracking-wider font-bold mt-4 focus:ring-2" id="vote-btn">
								VOTE
							</button>
							<p className={"transition-opacity min-h-6" + (error ? '' : ' opacity-0')}>{error}</p>
						</div>
						:
						<div className="col-span-full mx-auto grid place-items-center gap-y-2">
							<div id="g-btn" />
							<p className="text-sm italic">To vote, please log in to your Google account.</p>
						</div>
				}
			</form>
		</>
	)
}

export const getStaticProps = async () => {
	await dbConnect()
	const trainees = await DJTrainee.find().lean()
	const date = await Dates.findOne({ name: 'DJ Hunt' }, '-_id end').lean()

	return {
		props: {
			trainees: trainees.map(t => ({ ...t, _id: t._id.toString() })) as (Omit<IDJTrainee, '_id'> & { _id: string })[],
			endDate: date?.end.toString()
		}
	}
}

export default Page
