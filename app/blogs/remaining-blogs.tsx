'use client'

import { useEffect, useState } from 'react'
import { fetcher } from '@lib/axios-config'
import useSWRInfinite from 'swr/infinite'
import { BlogData } from './api/route'
import { PostData } from '@lib/posts'
import { LIMIT } from '@lib/page-limit'
import { Post, SkeletonPost } from '@components/post'

function getKey(pageIndex: number, previousPageData: any[]) {
	if (previousPageData && !previousPageData.length) return null
	return `/blogs/api?page=${pageIndex + 1}&limit=${LIMIT}`
}

export function RemainingBlogs() {
	const { data, setSize, isValidating } = useSWRInfinite<(PostData & BlogData)[]>(getKey, fetcher)
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
				data?.map(d => d.map(blog => (
					<Post
						key={blog.id}
						link={`/blogs/${blog.id}`}
						title={blog.title}
						excerpt={blog.excerpt}
						image={blog.featured_image}
						metadata={
							<div className="flex text-xs font-sans text-gray-600 space-x-4">
								<p>{(new Date(blog.posting_date)).toLocaleDateString()}</p>
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