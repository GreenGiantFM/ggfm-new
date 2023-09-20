import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react'
import { Navigation, A11y } from 'swiper/modules'
import Image from 'next/image'
import 'swiper/css'
import { LeftButton, RightButton } from './nav-buttons'
import { useRef } from 'react'

type ShowsProps = {
	images: {
		src: string
		alt: string
	}[]
}

export default function Shows({ images }: ShowsProps) {
	const navPrevRef = useRef<HTMLButtonElement>(null)
	const navNextRef = useRef<HTMLButtonElement>(null)

	const onBeforeInit = (Swiper: SwiperClass): void => {
		const navigation = Swiper.params.navigation;

		if (navigation && typeof navigation !== 'boolean') {
			navigation.prevEl = navPrevRef.current
			navigation.nextEl = navNextRef.current
		}
	}

	while (images.length < 6) {
		images.push(...images)
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
			{images.map(({ src, alt }) => (
				<SwiperSlide key={alt} className="!w-lg">
					<Image src={src} alt={alt} width={384} height={216} className="block mx-auto"/>
				</SwiperSlide>
			))}
			<LeftButton className="w-8" ref={navPrevRef} />
			<RightButton className="w-8" ref={navNextRef} />
		</Swiper>
	)
}
