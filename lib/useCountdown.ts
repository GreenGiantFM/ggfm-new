import { useEffect, useState } from 'react'

function getReturnValues(timestamp: number) {
	return {
		days: Math.floor(timestamp / 86400000),
		hours: Math.floor((timestamp % 86400000) / 3600000),
		minutes: Math.floor((timestamp % 3600000) / 60000),
		seconds: Math.floor((timestamp % 60000) / 1000),
	}
}

/**
 * Hook to get the remaining time left between the current timestamp to the target timestamp
 * @param target the target timestamp
 * @returns an object containing the days, hours, minutes, seconds of the remaining time left
 */
export function useCountdown(target: Date) {
	const targetTime = target.getTime()
	const [countdown, setCountdown] = useState(targetTime - new Date().getTime())

	useEffect(() => {
		const interval = setInterval(() => {
			setCountdown(targetTime - new Date().getTime())
		}, 1000)

		return () => clearInterval(interval)
	})

	return getReturnValues(countdown)
}
