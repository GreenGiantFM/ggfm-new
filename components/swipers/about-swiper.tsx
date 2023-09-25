'use client'

import { useRef } from 'react'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { Navigation, A11y, EffectFade } from 'swiper/modules'
import { LeftButton, RightButton } from './nav-buttons'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/effect-fade'
import { Highlights } from '@directus-collections'

type AboutSwiperProps = {
	highlights: Array<Pick<Highlights, 'image'>>
	description: string
}

export default function AboutSwiper({ highlights, description }: AboutSwiperProps) {
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
			modules={[A11y, Navigation, EffectFade]}
			effect="fade"
			fadeEffect={{
				crossFade: true
			}}
			onClick={() => { navNextRef.current?.click() }}
			onBeforeInit={onBeforeInit}
			loop
			className="bg-neutral-700 min-h-xs max-h-[inherit] !max-w-[calc(100vw-17px)] !overflow-hidden"
			style={{ aspectRatio: '3/2' }}
		>
			{highlights.map(({ image }) => (
				<SwiperSlide key={image.toString()} className="flex justify-center">
					<Image src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${image}`} alt="" width={1418} height={945} className="w-full h-full object-cover" priority={true} />
				</SwiperSlide>
			))}
			<LeftButton className="w-8 z-20" ref={navPrevRef} />
			<RightButton className="w-8 z-20" ref={navNextRef} />
			<div className="absolute bottom-0 pt-10 pb-4 w-full px-4 z-10"
				style={{ background: 'linear-gradient(rgba(25,25,25,0.0),rgba(25,25,25,0.8) 30%,rgba(25,25,25,0.8))' }}>
				<p className="mx-auto max-w-prose text-xs sm:text-sm md:text-base">{description}</p>
			</div>
		</Swiper>
	)
}