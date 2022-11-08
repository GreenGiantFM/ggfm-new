import CustomHead from '@components/head'
import { InferGetStaticPropsType, NextPage } from 'next'
import DJTrainee, { IDJTrainee } from '@models/dj-trainee'
import { DJTraineeItem, DJTraineeModal } from '@components/dj-trainee'
import { FormEventHandler, useMemo, useState } from 'react'
import dbConnect from '@lib/db'
import { app } from '@lib/axios-config'
import { getAxiosError } from '@lib/utils'
import Script from 'next/script'
import Dates from '@models/dates'
import { useCountdown } from '@lib/useCountdown'
import { PollsHeader } from '@components/polls-header'
import { LoadingButton } from '@components/loading-button'
import { useRouter } from 'next/router'

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ trainees, endDate }) => {
	const [trainee, setTrainee] = useState<IDJTrainee>()
	const [message, setMessage] = useState('')
	const [email, setEmail] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const countdown = useCountdown(new Date(endDate ?? ''))
	const isOpen = useMemo(() => countdown > 0, [countdown])
	const { push } = useRouter()

	const handleSubmit: FormEventHandler = async e => {
		e.preventDefault()
		setIsLoading(true)
		let timeout: NodeJS.Timeout | null = null

		try {
			const selection = new FormData(e.target as HTMLFormElement).getAll('selection')
			if (selection.length == 0) return setMessage('You have not selected any DJs!')

			if (!email) return setMessage('You are not logged in!')
			await app.post('/api/dj-hunt/votes', { email, selection })
			
			setMessage('Your vote has been recorded! Forwarding to polls...')
			timeout = setTimeout(() => push('/dj-hunt/polls'), 1000)
		} catch (e) {
			setMessage(getAxiosError(e))
		} finally {
			if (!timeout) {
				setIsLoading(false)
			}
		}
	}

	function handleToken({ credential }: { credential: string }) {
		const data = JSON.parse(window.atob(credential.split('.')[1].replace('-', '+').replace('_', '/')))
		setEmail(data.email)
	}

	return (
		<>
			<PollsHeader name="DJ HUNT" root="/dj-hunt" endDate={new Date(endDate ?? '')} />
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
						caption={t.caption}
						image={t.image}
						onMore={() => setTrainee(trainees[i])}
						onVote={() => setMessage('')}
						isVoteable={isOpen}
					/>
				))}
				<DJTraineeModal
					isOpen={trainee != undefined}
					close={() => setTrainee(undefined)}
					{...trainee}
				/>
				{
					isOpen && (
						email ?
							<div className="col-span-full text-center space-y-2">
								<LoadingButton isLoading={isLoading}
									className="btn white text-center rounded-full mx-auto w-full max-w-xs py-2 text-xl tracking-wider font-bold mt-4 focus:ring-2" id="vote-btn"
								>
									VOTE
								</LoadingButton>
								<p className={"transition-opacity min-h-6" + (message ? '' : ' opacity-0')}>{message}</p>
							</div>
							:
							<div className="col-span-full mx-auto grid place-items-center gap-y-2">
								<div id="g-btn" />
								<p className="text-sm italic">To vote, please log in to your Google account.</p>
							</div>
					)
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
