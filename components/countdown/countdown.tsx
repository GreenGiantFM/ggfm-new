import { useCountdown } from '@lib/useCountdown'
import { HTMLAttributes } from 'react'
import { DateTimeDisplay } from './date-time-display'

type CountdownProps = {
	end: Date
} & HTMLAttributes<HTMLDivElement>

export function Countdown({ end, className, ...props }: CountdownProps) {
	const { days, hours, minutes, seconds } = useCountdown(end)

	if (days + hours + minutes + seconds <= 0) {
		return (
			<div {...props}>
				<p>Polls are closed.</p>
			</div>
		)
	}

	return (
		<div className={'flex space-x-4 place-items-center text-center' + (className ? ' ' + className : '')} {...props}>
			<DateTimeDisplay value={days} type="days" />
			<DateTimeDisplay value={hours} type="hours" />
			<DateTimeDisplay value={minutes} type="minutes" />
			<DateTimeDisplay value={seconds} type="seconds" />
		</div>
	)
}
