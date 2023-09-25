'use client'

import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react'
import { A11y, Autoplay, Navigation } from 'swiper/modules'
import Image from 'next/image'
import { LeftButton, RightButton } from './nav-buttons'
import { useRef } from 'react'
import 'swiper/css'

type RadioTalentsProps = {
	images: {
		src: string
		alt: string
	}[],
	className?: string
	setIndex?: (index: number) => void
}

export default function RadioTalents({ images, className, setIndex }: RadioTalentsProps) {
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
		// Fix this bug, exceeding screen width if set to max-w-screen*
		<div className="max-w-[calc(100vw-17px)] mx-auto">
			<Swiper
				modules={[A11y, Autoplay, Navigation]}
				grabCursor
				loop
				slidesPerView='auto'
				watchSlidesProgress
				onBeforeInit={onBeforeInit}
				centeredSlides
				autoplay={{
					delay: 5000,
					disableOnInteraction: false
				}}
				className={className + ' radio-talents'}
				onSlideChange={(swiper) => setIndex?.(swiper.realIndex)}
			>
				{images.map(({ src, alt }) => (
					<SwiperSlide key={alt} className="flex justify-center !h-auto !w-64 transform transition-transform">
						<div className="h-98 w-auto">
							<Image src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${src}`}
								className="object-contain opacity-70"
								alt={alt}
								width={220}
								height={392}
							/>
						</div>
					</SwiperSlide>
				))}
				<LeftButton className="w-8" ref={navPrevRef} />
				<RightButton className="w-8" ref={navNextRef} />
			</Swiper>
		</div>
	)
}
