import { useEffect, useState } from 'react'

/**
 * Hook to get the remaining time left between the current timestamp to the target timestamp
 * @param target the target timestamp
 * @returns the number of miliseconds left
 */
export function useCountdown(target: Date) {
	const targetTime = target.getTime()
	const [countdown, setCountdown] = useState(targetTime - new Date().getTime() < 0 ? 0 : targetTime - new Date().getTime())

	useEffect(() => {
		const interval = setInterval(() => {
			const newTime = targetTime - new Date().getTime()

			if (newTime <= 0) {
				setCountdown(0)
				clearInterval(interval)
				return
			}

			setCountdown(newTime)
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	return countdown
}
