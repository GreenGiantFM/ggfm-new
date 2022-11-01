import CustomHead from '@components/head'
import { InferGetStaticPropsType, NextPage } from 'next'
import { FormEventHandler, useMemo, useState } from 'react'
import dbConnect from '@lib/db'
import { app } from '@lib/axios-config'
import { getAxiosError } from '@lib/utils'
import Script from 'next/script'
import Dates from '@models/dates'
import { useCountdown } from '@lib/useCountdown'
import { PollsHeader } from '@components/polls-header'
import dynamic from 'next/dist/shared/lib/dynamic'
import Track from '@models/track'
import { TrackItem } from '@components/track-item'

const AddTrackModal = dynamic(() => import('@components/add-track-modal').then(mod => mod.AddTrackModal))

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ tracks, endDate }) => {
	const [error, setError] = useState('')
	const [email, setEmail] = useState('')
	const [showModal, setShowModal] = useState(false)
	const countdown = useCountdown(new Date(endDate ?? ''))
	const isOpen = useMemo(() => countdown > 0, [countdown])

	const handleSubmit: FormEventHandler = async e => {
		e.preventDefault()
		const selection = new FormData(e.target as HTMLFormElement).getAll('selection')

		if (selection.length == 0) return setError('You have not selected any songs!')

		try {
			if (!email) return setError('You are not logged in!')
			await app.post('/api/hitlists/votes', { email, selection })
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
			<CustomHead
				title={`${process.env.NEXT_PUBLIC_SITE_TITLE} | Hitlist`}
				description="Voting polls for this week's GGFM's Top 20!"
				url="/hitlist"
			/>
			<AddTrackModal
				isOpen={showModal}
				close={() => setShowModal(false)}
			/>
			<PollsHeader name="HITLIST" endDate={new Date(endDate ?? '')} root="/hitlists" />
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
				{tracks.map(t => (
					<TrackItem
						key={t._id}
						_id={t._id}
						name={t.name}
						artists={t.artists}
						image={t.image}
						preview_url={t.preview_url}
						isVoteable={isOpen}
						onVote={() => setError('')}
					/>
				))}
				{
					email == process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
					<button type="button" onClick={() => setShowModal(true)} className="btn white rounded font-bold">RESET</button>
				}
				{
					isOpen && (
						email ?
							<div className="col-span-full mx-auto w-full max-w-xs text-center space-y-2">
								<button className="btn white text-center rounded-full py-2 text-xl tracking-wider font-bold mt-4 focus:ring-2" id="vote-btn">
									VOTE
								</button>
								<p className={"transition-opacity min-h-6" + (error ? '' : ' opacity-0')}>{error}</p>
							</div>
							:
							<div className="col-span-full mx-auto grid place-items-center gap-y-2 mt-4">
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
	const tracks = await Track.find({}).lean()
	const date = await Dates.findOne({ name: 'Hitlist' }, '-_id end').lean()

	return {
		props: {
			tracks,
			endDate: date?.end.toString()
		}
	}
}

export default Page
