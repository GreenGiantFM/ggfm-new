'use client'

import { Countdown } from "@components/countdown"
import { useCountdown } from "@lib/useCountdown"

type HeaderCountdownProps = {
	start: Date
	end: Date
}

export default function HeaderCountdown({ start, end }: HeaderCountdownProps) {
	const startCountdown = useCountdown(start)

	return (
		<>
			<Countdown target={start} className={startCountdown <= 0 ? 'hidden' : ''}>
				<p className="text-center mb-2">Polls are opening in...</p>
			</Countdown>
			<Countdown target={end} className={startCountdown > 0 ? 'hidden' : ''}>
				<p className="text-center mb-2">Polls are closing in...</p>
			</Countdown>
		</>
	)
}