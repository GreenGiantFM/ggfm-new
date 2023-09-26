'use client'

import { TrackItem } from '@components/track-item'
import { LoadingButton } from '@components/loading-button'
import { useRouter } from 'next/navigation'
import { useCountdown } from '@lib/useCountdown'
import { app } from '@lib/axios-config'
import { getAxiosError } from '@lib/utils'
import Script from 'next/script'
import { FormEventHandler, useState } from 'react'
import { AddTrackModal } from '@components/add-track-modal'
import { SpotifyTracks } from '@directus-collections'

type HitlistFormProps = {
	startDate: Date
	endDate: Date
	tracks: SpotifyTracks[]
}

export function HitlistForm({ startDate, endDate, tracks }: HitlistFormProps) {
	const [message, setMessage] = useState('')
	const [email, setEmail] = useState('')
	const [showModal, setShowModal] = useState(false)
	const startCountdown = useCountdown(startDate)
	const endCountdown = useCountdown(endDate)
	const isOpen = endCountdown > 0 && startCountdown <= 0
	const [isLoading, setIsLoading] = useState(false) // loading button indicator
	const { push } = useRouter()

	function handleToken({ credential }: { credential: string }) {
		const data = JSON.parse(window.atob(credential.split('.')[1].replace('-', '+').replace('_', '/')))
		setEmail(data.email)
	}

	const handleSubmit: FormEventHandler = async e => {
		e.preventDefault()
		setIsLoading(true)
		let timeout: NodeJS.Timeout | null = null

		try {
			const selection = new FormData(e.target as HTMLFormElement).getAll('selection')

			if (selection.length == 0) return setMessage('You have not selected any songs!')

			if (!email) return setMessage('You are not logged in!')
			await app.post('/hitlists/votes', { email, selection })

			setMessage('Your vote has been recorded! Forwarding to polls...')
			timeout = setTimeout(() => push('/hitlists/polls'), 1000)
		} catch (e) {
			setMessage(getAxiosError(e))
		} finally {
			if (!timeout) {
				setIsLoading(false)
			}
		}
	}

	return (
		<>
			<AddTrackModal
				isOpen={showModal}
				close={() => setShowModal(false)}
			/>
			<form className="grid md:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-4 md:gap-y-8 self-start max-w-6xl px-4 py-12 xl:px-8 2xl:px-32 mx-auto w-full" onSubmit={handleSubmit}>
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
				{tracks.map((t, i) => (
					<TrackItem
						key={t.id}
						id={t.id}
						name={t.name}
						artists={t.artists}
						image={t.image}
						preview_url={t.preview_url}
						isVoteable={isOpen}
						index={i}
						onVote={() => setMessage('')}
					/>
				))}
				{
					email === process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
					<button type="button" onClick={() => setShowModal(true)} className="btn white rounded font-bold">RESET</button>
				}
				{
					email ?
						(isOpen &&
							<div className="col-span-full text-center space-y-2">
								<LoadingButton id="vote-btn" isLoading={isLoading}
									className="btn white text-center mx-auto w-full max-w-xs rounded-full py-2 text-xl tracking-wider font-bold mt-4 focus:ring-2"
								>
									VOTE
								</LoadingButton>
								<p className={"transition-opacity min-h-6" + (message ? '' : ' opacity-0')}>{message}</p>
							</div>
						)
						:
						<div className="col-span-full mx-auto grid place-items-center gap-y-2 mt-4">
							<div id="g-btn" />
							<p className="text-sm italic">To vote, please log in to your Google account.</p>
						</div>
				}
			</form>
		</>
	)
}