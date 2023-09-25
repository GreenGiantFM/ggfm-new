'use client'

import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react'
import { Navigation, A11y } from 'swiper/modules'
import Image from 'next/image'
import 'swiper/css'
import { LeftButton, RightButton } from './nav-buttons'
import { useRef } from 'react'
import { Shows } from '@directus-collections'

type ShowsProps = {
	shows: Array<Pick<Shows, 'name' | 'image'>>
}

export default function Shows({ shows }: ShowsProps) {
	const navPrevRef = useRef<HTMLButtonElement>(null)
	const navNextRef = useRef<HTMLButtonElement>(null)

	const onBeforeInit = (Swiper: SwiperClass): void => {
		const navigation = Swiper.params.navigation;

		if (navigation && typeof navigation !== 'boolean') {
			navigation.prevEl = navPrevRef.current
			navigation.nextEl = navNextRef.current
		}
	}

	while (shows.length && shows.length < 6) {
		shows.push(...shows)
	}

	return (
		<Swiper
			modules={[A11y, Navigation]}
			grabCursor
			centeredSlides
			onBeforeInit={onBeforeInit}
			loop
			slidesPerView='auto'
			watchSlidesProgress
		>
			{shows.map(({ image, name }) => (
				<SwiperSlide key={name} className="!w-lg">
					<Image src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${image}`} alt={name} width={384} height={216} className="block mx-auto" />
				</SwiperSlide>
			))}
			<LeftButton className="w-8" ref={navPrevRef} />
			<RightButton className="w-8" ref={navNextRef} />
		</Swiper>
	)
}
