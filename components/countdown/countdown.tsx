'use client'

import { useCountdown } from '@lib/useCountdown'
import { parseUnitTime } from '@lib/utils'
import { HTMLAttributes } from 'react'
import { DateTimeDisplay } from './date-time-display'

export type CountdownProps = {
	target: Date
} & HTMLAttributes<HTMLDivElement>

export function Countdown({ target, className, children, ...props }: CountdownProps) {
	const { days, hours, minutes, seconds } = parseUnitTime(useCountdown(target))

	if (days + hours + minutes + seconds <= 0) {
		return (
			<div className={className} {...props}>
				<p className="text-2xl py-4">Polls are closed.</p>
			</div>
		)
	}

	return (
		<div className={className ? className : ''}>
			{children}
			<div className={'flex space-x-4 place-items-center text-center'} {...props}>
				<DateTimeDisplay value={days} type="days" />
				<DateTimeDisplay value={hours} type="hours" />
				<DateTimeDisplay value={minutes} type="minutes" />
				<DateTimeDisplay value={seconds} type="seconds" />
			</div>
		</div>
	)
}
