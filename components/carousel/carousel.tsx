import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import Image from 'next/future/image'
import { HTMLAttributes, useCallback, useEffect, useRef, useState } from 'react'

type CarouselProps = {
	images: {
		url: string
		alt: string
		width: number
		height: number
	}[]
} & HTMLAttributes<HTMLDivElement>

const style = `w-6 aspect-square absolute rounded-full bg-white text-neutral-900 grid
		place-items-center top-1/2 transform -translate-y-1/2 cursor-pointer
		z-10`

export function Carousel({ images, className, ...props }: CarouselProps) {
	const [idx, setIdx] = useState(0)
	const maxIdx = images.length - 1
	const timer = useRef<NodeJS.Timeout>()

	const nextImage = useCallback(
		() => setIdx(idx >= maxIdx ? 0 : idx + 1),
		[idx, maxIdx, setIdx]
	)
	const previousImage = () => setIdx(idx == 0 ? maxIdx : idx - 1)

	// autoscroll carousel
	useEffect(() => {
		clearTimeout(timer.current)
		timer.current = setTimeout(nextImage, 5000)
	}, [idx, nextImage])

	return (
		<div className={`relative select-none grid place-items-center${className ? ' ' + className : ''}`} {...props}>
			<button className={style + ' left-2'} onClick={previousImage}>
				<ChevronLeftIcon className="transform -translate-x-0.25" />
			</button>
			<button className={style + ' right-2'} onClick={nextImage}>
				<ChevronRightIcon className="transform translate-x-0.25" />
			</button>
			<div className="relative w-full h-full">
				{images.map((img, i) => (
					<div key={img.url} className={`absolute transition-opacity duration-500 ${i == idx ? 'opacity-100' : 'opacity-0'}`}>
						<Image className="w-full h-full" src={img.url} width={img.width} height={img.height} alt={img.alt} />
					</div>
				))}
			</div>
			<div className="absolute bottom-7 z-10 flex justify-center w-full space-x-2 items-center transition-transform">
				{images.map((_, i) => (
					<div key={i} className={
						`rounded-full outline outline-white outline-1 w-2 aspect-square cursor-pointer hover:scale-125 transition-all${idx == i && ' bg-white'}`
					}
						onClick={() => setIdx(i)} />
				))}
			</div>
		</div>
	)
}
