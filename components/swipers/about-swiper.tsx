import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, A11y, EffectFade } from 'swiper'
import { LeftButton, RightButton } from './nav-buttons'
import Image from 'next/future/image'

import 'swiper/css'
import 'swiper/css/effect-fade'

type AboutSwiperProps = {
	images: {
		src: string
		alt: string
	}[]
}

export default function AboutSwiper({ images }: AboutSwiperProps) {
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
			modules={[A11y, Navigation, EffectFade]}
			effect="fade"
			fadeEffect={{
				crossFade: true
			}}
			onClick={() => { navNextRef.current?.click() }}
			onBeforeInit={onBeforeInit}
			loop
			className="bg-neutral-700 min-h-xs max-h-full !max-w-[calc(100vw-17px)]"
			style={{ aspectRatio: '3/2' }}
		>
			{images.map(({ src, alt }) => (
				<SwiperSlide key={alt} className="flex justify-center">
					<Image src={src} alt={alt} width={1418} height={945} className="w-full h-full object-cover" priority={true} />
				</SwiperSlide>
			))}
			<LeftButton className="w-8 z-20" ref={navPrevRef} />
			<RightButton className="w-8 z-20" ref={navNextRef} />
			<div className="absolute bottom-0 pt-10 pb-4 w-full px-4 z-10"
				style={{ background: 'linear-gradient(rgba(25,25,25,0.0),rgba(25,25,25,0.8) 30%,rgba(25,25,25,0.8))' }}>
				<p className="mx-auto max-w-prose text-xs sm:text-sm md:text-base">
					Green Giant FM (GGFM) is De La Salle University-Manila&apos;s Official Radio Station,
					located at Br. Bloemen Hall. Green Giant FM broadcasts live on weekdays except Wednesdays from 9:15 AM - 7:30 PM.
				</p>
			</div>
		</Swiper>
	)
}