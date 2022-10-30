import { useEffect, useState } from 'react'

/**
 * Hook to get the remaining time left between the current timestamp to the target timestamp
 * @param target the target timestamp
 * @returns the number of miliseconds left
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

	return countdown
}
