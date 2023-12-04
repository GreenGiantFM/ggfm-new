'use client'

import { BorderedLink } from '@components/bordered-button'
import DJHunt from '@components/swipers/dj-hunt'
import { DjTrainees } from '@directus-collections'
import { useCountdown } from '@lib/useCountdown'

type DJHuntBannerProps = {
	start: Date
	end: Date
	trainees: DjTrainees[]
}

export function DJHuntBanner({ start, end, trainees }: DJHuntBannerProps) {
	const startCountdown = useCountdown(start)
	const endCountdown = useCountdown(end)
	const diff = end.getTime() - start.getTime()

	if (startCountdown > 0 || endCountdown <= 0) return <></>

	return (
		<section className="bg-neutral-800 !py-12 !px-4 overflow-hidden">
			<h1 className="text-center text-stroke-primary-dark sm:text-stroke-md text-stroke-sm font-bold !text-8xl !sm:text-9xl">DJ HUNT {new Date().getFullYear()}</h1>
			<progress className="w-full block rounded-full" value={((new Date().getTime() - start.getTime()) / diff)} />
			<DJHunt className="my-6 !py-4 select-none" images={trainees.map(t => ({
				src: process.env.NEXT_PUBLIC_ASSETS_URL + t.image,
				alt: t.nickname,
			}))} />
			<BorderedLink href="/dj-hunt" className="max-w-64 hover:(bg-white text-gray-900 font-bold)">Vote Now</BorderedLink>
		</section>
	)
}