'use client'

import Script from 'next/script'
import { DJTraineeItem, DJTraineeModal } from '@components/dj-trainee'
import { FormEventHandler, useEffect, useMemo, useState } from 'react'
import { useCountdown } from '@lib/useCountdown'
import { LoadingButton } from '@components/loading-button'
import { getAxiosError } from '@lib/utils'
import { app } from '@lib/axios-config'
import { DjTrainees } from '@directus-collections'

type DJVotingFormProps = {
	trainees: Array<DjTrainees>
	startDate: Date
	endDate: Date
}

export function DJVotingForm({ trainees, startDate, endDate }: DJVotingFormProps) {
	const [email, setEmail] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const startCountdown = useCountdown(startDate)
	const endCountdown = useCountdown(endDate)
	const [trainee, setTrainee] = useState<DjTrainees>()
	const [message, setMessage] = useState('')
	const isOpen = useMemo(() => endCountdown > 0 && startCountdown <= 0, [endCountdown, startCountdown])
	const [isReady, setIsReady] = useState(false)

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
			if (selection.length == 0) return setMessage('You have not selected any DJs!')

			if (!email) return setMessage('You are not logged in!')
			await app.post('/dj-hunt/votes', { email, selection })

			setMessage('Thank you. Your vote has been recorded!')
		} catch (e) {
			setMessage(getAxiosError(e))
		} finally {
			if (!timeout) {
				setIsLoading(false)
			}
		}
	}

	// render google button when polls are open and script is loaded
	useEffect(() => {
		if (isOpen && isReady) {
			window.google.accounts.id.initialize({
				client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
				callback: handleToken
			})
			window.google.accounts.id.renderButton(document.getElementById("g-btn"), {
				shape: 'pill',
			})
		}
	}, [isOpen, isReady])

	return (
		<>
			<Script src="https://accounts.google.com/gsi/client" async defer
				onReady={() => setIsReady(true)}
			/>
			<form className="grid md:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-4 md:gap-y-8 self-start max-w-6xl px-2 py-4 lg:py-12 xl:px-8 2xl:px-32 mx-auto w-full" onSubmit={handleSubmit}>
				{trainees.map((t, i) => (
					<DJTraineeItem
						key={t.id}
						id={t.id}
						nickname={t.nickname ?? ''}
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
