'use client'

import { useRef } from 'react'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { Navigation, A11y, Pagination } from 'swiper/modules'
import { LeftButton, RightButton } from './nav-buttons'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/pagination'

type AOWProps = {
	images: {
		src: string
		alt: string
	}[]
}

export default function AOW({ images }: AOWProps) {
	const navPrevRef = useRef<HTMLButtonElement>(null)
	const navNextRef = useRef<HTMLButtonElement>(null)

	const onBeforeInit = (Swiper: SwiperClass): void => {
		const navigation = Swiper.params.navigation;

		if (navigation && typeof navigation !== 'boolean') {
			navigation.prevEl = navPrevRef.current
			navigation.nextEl = navNextRef.current
		}
	}

	return (
		<Swiper
			modules={[A11y, Navigation, Pagination]}
			slidesPerView={1}
			grabCursor
			onBeforeInit={onBeforeInit}
			pagination={{
				clickable: true
			}}
			loop
			className="max-w-[435px] w-full mx-auto aspect-square"
		>
			{images.map(({ src, alt }) => (
				<SwiperSlide key={alt} className="flex justify-center">
					<Image src={src} alt={alt} width={435} height={435} className="w-full h-full" />
				</SwiperSlide>
			))}
			<LeftButton className="w-8" ref={navPrevRef} />
			<RightButton className="w-8" ref={navNextRef} />
		</Swiper>
	)
}