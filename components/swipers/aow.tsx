import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, A11y, Pagination } from 'swiper'
import { LeftButton, RightButton } from './nav-buttons'
import Image from 'next/future/image'

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

	const onBeforeInit = (Swiper: SwiperCore): void => {
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
			lazy
			pagination={{
				clickable: true
			}}
			loop
			className="max-w-[435px] w-full mx-auto aspect-square"
		>
			{images.map(({ src, alt }) => (
				<SwiperSlide key={alt} className="flex justify-center">
					<Image src={src} alt={alt} fill />
				</SwiperSlide>
			))}
			<LeftButton className="w-8" ref={navPrevRef} />
			<RightButton className="w-8" ref={navNextRef} />
		</Swiper>
	)
}