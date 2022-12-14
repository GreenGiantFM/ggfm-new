import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Autoplay } from 'swiper'
import Image from 'next/future/image'

type DJHuntProps = {
	images: {
		src: string
		alt: string
	}[],
	className?: string
}

export default function DJHunt({ images, className }: DJHuntProps) {
	return (
		<Swiper
			modules={[A11y, Autoplay]}
			grabCursor
			lazy
			slidesPerView='auto'
			watchSlidesProgress
			loop
			loopedSlides={images.length}
			centeredSlides
			autoplay={{
				delay: 2500,
				disableOnInteraction: false
			}}
			className={className + ' dj-hunt'}
		>
			{images.map(({ src, alt }) => (
				<SwiperSlide key={alt} className="grid place-items-center font-primary text-xl !w-[fit-content] transform transition-transform px-5">
					<div className="w-20 aspect-square">
						<Image src={src} alt={`DJ ${alt}`} className="rounded-full w-full h-full object-cover" width={72} height={72} />
					</div>
					<span>DJ {alt}</span>
				</SwiperSlide>
			))}
		</Swiper>
	)
}
