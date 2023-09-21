'use client'

import { BorderedLink } from '@components/bordered-button'
import DJHunt from '@components/swipers/dj-hunt'
import { useCountdown } from '@lib/useCountdown'
import { IDJTrainee } from '@models/dj-trainee'

type DJHuntBannerProps = {
	start: Date
	end: Date
	trainees: IDJTrainee[]
}

export function DJHuntBanner({ start, end, trainees }: DJHuntBannerProps) {
	const startCountdown = useCountdown(start)
	const endCountdown = useCountdown(end)
	const diff = startCountdown - endCountdown

	if (startCountdown <= 0 && endCountdown > 0) return <></>

	return (
		<section className="bg-neutral-800 !py-12 !px-4 overflow-hidden">
			<h1 className="text-center text-stroke-primary-dark sm:text-stroke-md text-stroke-sm font-bold !text-8xl !sm:text-9xl">DJ HUNT 2022</h1>
			<progress className="w-full block rounded-full" value={1 - (endCountdown / diff)} />
			<DJHunt className="my-6 !py-4 select-none" images={trainees.map(t => ({
				src: `https://lh3.googleusercontent.com/d/${t.image}`,
				alt: t.nickname,
			}))} />
			<BorderedLink href="/dj-hunt" className="max-w-64 hover:(bg-white text-gray-900 font-bold)">Vote Now</BorderedLink>
		</section>
	)
}