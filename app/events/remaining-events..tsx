'use client'

import { fetcher } from '@lib/axios-config'
import useSWRInfinite from 'swr/infinite'
import { useEffect, useState } from 'react'
import { PostData } from '@lib/posts'
import { Post, SkeletonPost } from '@components/post'
import { LIMIT } from '@lib/page-limit'
import { EventData } from './api/route'

function getKey(pageIndex: number, previousPageData: any[]) {
	if (previousPageData && !previousPageData.length) return null
	return `/events/api?page=${pageIndex + 1}&limit=${LIMIT}`
}

export function RemainingEvents() {
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
		<>
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
		</>
	)
}