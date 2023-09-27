'use client'

import { useEffect, useState } from 'react'
import { fetcher } from '@lib/axios-config'
import useSWRInfinite from 'swr/infinite'
import { LIMIT } from '@lib/page-limit'
import { Post, SkeletonPost } from '@components/post'
import { getBlogs } from './get-blogs'

export function RemainingBlogs() {
	const { data, setSize, isValidating } = useSWRInfinite<Awaited<ReturnType<typeof getBlogs>>>(getKey, fetcher)
	const [isEnd, setIsEnd] = useState(false)

	function getKey(pageIndex: number, previousPageData: any[]) {
		if (previousPageData && previousPageData.length < LIMIT) {
			setIsEnd(true)
			return null
		}
		return `/blogs/api?page=${pageIndex + 2}&limit=${LIMIT}`
	}

	function handleScroll() {
		if (window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - 100)
			setSize(s => ++s)
	}

	useEffect(() => {
		if (isValidating || isEnd) return

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [isValidating, isEnd])

	return (
		<>
			{
				data?.map(d => d.map(blog => (
					<Post
						key={blog.id}
						link={`/blogs/${blog.id}`}
						title={blog.title}
						excerpt={blog.body}
						image={process.env.NEXT_PUBLIC_ASSETS_URL + blog.image}
						metadata={
							<div className="flex text-xs font-sans text-gray-600 space-x-4">
								<p>{(new Date(blog.posting_date)).toLocaleDateString()}</p>
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