'use client'

import { fetcher } from '@lib/axios-config'
import useSWRInfinite from 'swr/infinite'
import { useEffect, useState } from 'react'
import { Post, SkeletonPost } from '@components/post'
import { LIMIT } from '@lib/page-limit'
import { getEvents } from './get-events'

export function RemainingEvents() {
	const { data, setSize, isValidating } = useSWRInfinite<Awaited<ReturnType<typeof getEvents>>>(getKey, fetcher)
	const [isEnd, setIsEnd] = useState(false)

	function getKey(pageIndex: number, previousPageData: any[]) {
		if (previousPageData && previousPageData.length < LIMIT) {
			setIsEnd(true)
			return null
		}
		return `/events/api?page=${pageIndex + 2}&limit=${LIMIT}`
	}

	function handleScroll() {
		if (window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - 100)
			setSize(s => ++s)
	}

	useEffect(() => {
		if (isValidating || isEnd) return

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [isValidating])

	return (
		<>
			{
				data?.map(d => d.map(event => (
					<Post
						key={event.id}
						link={`/events/${event.id}`}
						title={event.title}
						excerpt={event.body}
						image={process.env.NEXT_PUBLIC_ASSETS_URL + event.image}
						metadata={
							<div className="flex text-xs font-sans text-gray-600 space-x-4">
								<p>{(new Date(event.posting_date)).toLocaleDateString()}</p>
								<p>{event.location}</p>
							</div>
						}
					/>
				)))
			}
			<div className={`transition-opacity duration-200 ${isValidating ? '' : 'opacity-0'}`}>
				<SkeletonPost />
			</div>
		</>
	)
}