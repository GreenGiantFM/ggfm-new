import { NextPage, InferGetStaticPropsType } from 'next'
import { fetcher } from '@lib/axios-config'
import useSWRInfinite from 'swr/infinite'
import { getFilesAndData, PostData } from '@lib/posts'
import { EventData } from '@pages/api/events'
import { useEffect, useState } from 'react'
import { Post, SkeletonPost } from '@components/post'
import CustomHead from '@components/head'

const LIMIT = 20

function getKey(pageIndex: number, previousPageData: any[]) {
	if (previousPageData && !previousPageData.length) return null
	return `/api/events?page=${pageIndex + 1}&limit=${LIMIT}`
}

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ events }) => {
	const { data, setSize, isValidating } = useSWRInfinite<(PostData & EventData)[]>(getKey, fetcher)
	const [isSkeletonVisible, setIsSkeletonVisible] = useState(false)

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsSkeletonVisible(isValidating)
		}, isValidating ? 0 : 2000)

		return () => clearTimeout(timeout)
	}, [isValidating])

	function handleScroll() {
		if (window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - 100 && !isValidating)
			setSize(s => ++s)
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	})

	return (
		<div className="max-w-screen-xl w-full px-6 sm:px-16 my-8 justify-self-center">
			<CustomHead
				title={`${process.env.NEXT_PUBLIC_SITE_TITLE} | Events`}
				description="Events covered by GreenGiantFM"
				url="/events"
			/>
			<div className="grid grid-cols-[repeat(8,1fr)_repeat(4,minmax(48px,1fr))] md:gap-8 lg:gap-0 w-full">
				<section className="col-start-1 col-span-full lg:col-span-8 xl:col-span-7 row-start-1 space-y-8">
					{
						events.map(event => (
							<Post
								key={event.id}
								link={`/events/${event.id}`}
								title={event.title}
								excerpt={event.excerpt}
								image={event.featured_image}
								metadata={
									<div className="flex text-xs font-sans text-gray-600 space-x-4">
										<p>{(new Date(event.posting_date)).toLocaleDateString()}</p>
										<p>{event.location}</p>
									</div>
								}
							/>
						))
					}

					{
						data?.map(d => d.map(event => (
							<Post
								key={event.id}
								link={`/events/${event.id}`}
								title={event.title}
								excerpt={event.excerpt}
								image={event.featured_image}
								metadata={
									<div className="flex text-xs font-sans text-gray-600 space-x-4">
										<p>{(new Date(event.posting_date)).toLocaleDateString()}</p>
										<p>{event.location}</p>
									</div>
								}
							/>
						)))
					}
					<div className={`transition-opacity duration-200 ${isSkeletonVisible ? '' : 'opacity-0'}`}>
						<SkeletonPost />
					</div>
				</section>
				<aside className="col-start-9 col-span-3 row-start-1 hidden lg:block">
					<h1 className="sticky top-8 text-white text-6xl text-center">EVENTS</h1>
				</aside>
			</div>
		</div>
	)
}

export default Page

export const getStaticProps = async () => {
	const events = await getFilesAndData<EventData>(['posts', 'events'], {
		page: '0',
		limit: LIMIT.toString(),
	})

	return {
		props: {
			events
		}
	}
}
