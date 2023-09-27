'use client'

import RadioTalents from '@components/swipers/radio-talents'
import { RadioTalents as RadioTalentsType } from '@directus-collections'
import { useState } from 'react'

type TalentSliderProps = {
	talents: Array<Pick<RadioTalentsType, 'name' | 'nickname' | 'writeup' | 'image'>>
}

export function TalentSlider({ talents }: TalentSliderProps) {
	const [index, setIndex] = useState(0)

	return (
		<>
			<RadioTalents
				images={talents.map(t => ({ src: t.image as string ?? '', alt: `Photo of DJ ${t.nickname}` }))}
				className="container h-full !pt-8 !pb-16"
				setIndex={setIndex}
			/>
			<div className="bg-neutral-900">
				<div className="grid md:grid-cols-2 place-items-center children:w-full container mx-auto py-20 px-4 gap-8">
					<div>
						<h3 className="text-6xl uppercase">DJ {talents[index].nickname}</h3>
						<h4 className="text-xl font-secondary">{talents[index].name}</h4>
						<div className="italic text-xl max-w-md mt-8" dangerouslySetInnerHTML={{ __html: talents[index].writeup ?? '' }} />
					</div>
					{/* <iframe
						className="w-full max-w-lg aspect-video"
						src={`https://www.youtube.com/embed/W41ZXc3jWBg`}
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/> */}
				</div>
			</div>
		</>
	)
}
