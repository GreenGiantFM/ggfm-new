'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Autoplay } from 'swiper/modules'
import Image from 'next/image'

type DJHuntProps = {
	images: {
		src: string
		alt: string
	}[],
	className?: string
}

export default function DJHunt({ images, className }: DJHuntProps) {

	while (images.length && images.length < 26) {
		images.push(...images)
	}

	return (
		<Swiper
			modules={[A11y, Autoplay]}
			grabCursor
			slidesPerView='auto'
			watchSlidesProgress
			loop
			centeredSlides
			autoplay={{
				delay: 2500,
				disableOnInteraction: false
			}}
			className={className + ' dj-hunt'}
		>
			{images.map(({ src, alt }, i) => (
				<SwiperSlide key={i} className="grid place-items-center font-primary text-xl !w-[fit-content] transform transition-transform px-5">
					<div className="w-20 aspect-square">
						<Image src={src} alt={`DJ ${alt}`} className="rounded-full w-full h-full object-cover" width={72} height={72} />
					</div>
					<p className="text-center">DJ {alt}</p>
				</SwiperSlide>
			))}
		</Swiper>
	)
}
