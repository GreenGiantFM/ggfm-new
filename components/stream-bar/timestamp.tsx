import { HTMLAttributes, MutableRefObject, useEffect, useRef, useState } from 'react'

function formatNumber(n: number) {
	return n.toLocaleString('en-US', { minimumIntegerDigits: 2 })
}

type TimeStampProps = {
	isPlaying: boolean
	hasLoaded: MutableRefObject<boolean>
} & HTMLAttributes<HTMLParagraphElement>

export function TimeStamp({ isPlaying, hasLoaded, ...props }: TimeStampProps) {
	const [timestamp, setTimestamp] = useState(0)
	const interval = useRef<NodeJS.Timeout>()

	useEffect(() => {
		try {
			if (!isPlaying) {
				clearInterval(interval.current)
				return interval.current = undefined
			}

			if (interval.current) return

			interval.current = setInterval(() => {
				if (hasLoaded.current) setTimestamp(x => ++x)
			}, 1000)

		} finally {
			return () => clearInterval(interval.current)
		}
	}, [isPlaying, hasLoaded])

	return (
		<p {...props}>{formatNumber(Math.floor(timestamp / 60))}:{formatNumber(timestamp % 60)}</p>
	)
}