import CustomHead from '@components/head'
import dbConnect from '@lib/db'
import RadioTalent from '@models/radio-talent'
import { NextPage, InferGetStaticPropsType } from 'next'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const RadioTalents = dynamic(() => import('@components/swipers/radio-talents'))

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ talents }) => {
	const [index, setIndex] = useState(0)

	return (
		<section className="bg-secondary pt-8 flex flex-col">
			<CustomHead
				title={`${process.env.NEXT_PUBLIC_SITE_TITLE} | Radio Talents`}
				description="The faces and voices of Green Giant FM"
				url="/radio-talents"
			/>
			<h1 className="text-4xl sm:text-5xl text-neutral-700 text-center">MEET THE DJ&apos;S OF GREEN GIANT FM</h1>
			<h2 className="font-secondary text-neutral-600 text-center text-sm sm:text-base">THE FACES AND VOICES OF GREEN GIANT</h2>
			<RadioTalents
				images={talents.map(t => ({ src: t.image, alt: `Photo of DJ ${t.nickname}` }))}
				className="container h-full !pt-8 !pb-16"
				setIndex={setIndex}
			/>
			<div className="bg-neutral-900">
				<div className="grid md:grid-cols-2 place-items-center children:w-full container mx-auto py-8 px-4 gap-8">
					<div>
						<h3 className="text-6xl uppercase">DJ{talents[index].isTrainee && 'T'} {talents[index].nickname}</h3>
						<h4 className="text-xl font-secondary">{talents[index].name}</h4>
						<p className="italic text-xl max-w-md mt-8">{talents[index].writeup}</p>
					</div>
					<iframe
						className="w-full max-w-lg aspect-video"
						src={`https://www.youtube.com/embed/W41ZXc3jWBg?origin=${process.env.NEXT_PUBLIC_VERCEL_URL}`}
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
				</div>
			</div>
		</section>
	)
}

export default Page

export const getStaticProps = async () => {
	await dbConnect()
	const talents = await RadioTalent.find({}).lean()

	return {
		props: {
			talents: talents.map(t => ({ ...t, _id: t._id.toString() }))
		}
	}
}
