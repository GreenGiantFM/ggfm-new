import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, A11y } from 'swiper'
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

	const onBeforeInit = (Swiper: SwiperCore): void => {
		const navigation = Swiper.params.navigation;

		if (navigation && typeof navigation !== 'boolean') {
			navigation.prevEl = navPrevRef.current
			navigation.nextEl = navNextRef.current
		}
	}

	return (
		<Swiper
			modules={[A11y,Navigation]}
			grabCursor
			centeredSlides
			onBeforeInit={onBeforeInit}
			lazy
			slidesPerView='auto'
			className="!w-full"
			watchSlidesProgress
			loop
			loopedSlides={images.length}
		>
			{images.map(({ src, alt }) => (
				<SwiperSlide key={alt} className="flex justify-center !w-lg">
					<Image src={src} alt={alt} width={384} height={216} />
				</SwiperSlide>
			))}
			<LeftButton className="w-8" ref={navPrevRef} />
			<RightButton className="w-8" ref={navNextRef} />
		</Swiper>
	)
}
