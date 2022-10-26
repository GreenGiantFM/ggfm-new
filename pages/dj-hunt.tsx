import CustomHead from '@components/head'
import { InferGetStaticPropsType, NextPage } from 'next'
import DJTrainee, { IDJTrainee } from '@models/dj-trainee'
import { DJTraineeItem, DJTraineeModal } from '@components/dj-trainee'
import { FormEventHandler, useState } from 'react'
import dbConnect from '@lib/db'

export const SELECTION_KEY = 'selection'

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ trainees }) => {
	const [trainee, setTrainee] = useState<IDJTrainee>()
	const [showError, setShowError] = useState(false)

	const handleSubmit: FormEventHandler = e => {
		e.preventDefault()
		const selection = new FormData(e.target as HTMLFormElement).getAll('selection')

		if (selection.length == 0) {
			setShowError(true)
		}
	}

	return (
		<form className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 self-start container py-10 px-4 xl:px-8 2xl:px-32 mx-auto" onSubmit={handleSubmit}>
			<CustomHead
				title={`${process.env.NEXT_PUBLIC_SITE_TITLE} | DJ Hunt`}
				description="Voting polls for voting the next Green Giant FM DJ!"
				url="/dj-hunt"
			/>
			{trainees.map((t, i) => (
				<DJTraineeItem
					key={t._id}
					_id={t._id}
					nickname={t.nickname}
					segue={t.segue}
					image={t.image}
					onMore={() => setTrainee(trainees[i])}
					onVote={() => setShowError(false)}
				/>
			))}
			<DJTraineeModal
				isOpen={trainee != undefined}
				close={() => setTrainee(undefined)}
				{...trainee}
			/>
			<div className="col-span-full mx-auto w-full max-w-md text-center space-y-2">
				<button className="btn white text-center rounded-full py-2 text-xl
				tracking-wider font-bold mt-4 focus:ring-2">
					VOTE
				</button>
				<p className={"transition-opacity" + (showError ? '' : ' opacity-0')}>You have not selected a DJ to vote yet!</p>
			</div>
		</form>
	)
}

export const getStaticProps = async () => {
	await dbConnect()
	const trainees = await DJTrainee.find().lean()

	return {
		props: {
			trainees: trainees.map(t => ({ ...t, _id: t._id.toString() })) as (Omit<IDJTrainee, '_id'> & { _id: string })[],
		}
	}
}

export default Page
