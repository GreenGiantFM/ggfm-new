import { ResolvingMetadata, Metadata } from 'next'
import Image from 'next/image'
import styles from '@styles/Post.module.css'
import { extractSummary, formatDate } from '@lib/utils'
import { notFound } from 'next/navigation'
import { directus } from '@lib/directus'
import { readItem, readItems } from '@directus/sdk'

export async function generateStaticParams() {
	const ids = await directus.request(readItems('events', {
		fields: ['id'],
		filter: { status: { _eq: 'published' } }
	}))

	return ids.map(id => id.toString())
}

type BlogPageProps = {
	params: {
		id: string
	}
}

async function getData(params: BlogPageProps['params']) {
	try {
		return await directus.request(readItem('blogs', params.id, {
			fields: ['title', 'image', 'posting_date', 'author', 'youtube_link', 'body'],
			filter: { status: { _eq: 'published' } }
		}))
	} catch (e) {
		console.error(e)
		return undefined
	}
}

export async function generateMetadata({ params }: BlogPageProps, parent: ResolvingMetadata): Promise<Metadata> {
	const [blog, awaitedParent] = await Promise.all([getData(params), parent])

	if (!blog) notFound()

	const prevImages = awaitedParent.openGraph?.images || []

	return {
		title: blog.title,
		description: extractSummary(blog.body),
		openGraph: {
			images: [process.env.NEXT_PUBLIC_ASSETS_URL + blog.image, ...prevImages]
		}
	} as Metadata
}

export default async function BlogPage({ params }: BlogPageProps) {
	const blog = await getData(params)

	if (!blog) notFound()

	return (
		<div className="grid grid-cols-[minmax(40ch,70ch)] lg:grid-cols-[minmax(150px,400px)_minmax(40ch,max-content)] 
			gap-x-8 xl:gap-x-16 place-self-center md:my-16 md:mx-8 gap-y-0 md:gap-y-4"
		>
			<aside className="relative">
				<div className="sticky top-32">
					<Image alt={`Post of ${blog.title}`} src={process.env.NEXT_PUBLIC_ASSETS_URL + blog.image} fill className="object-contain !relative shadow-2xl block" />
				</div>
			</aside>
			<article className="bg-white p-8 shadow-xl max-w-[calc(65ch+4rem)] text-gray-900">
				<div className="mb-4">
					<h1 className="text-5xl mb-1">{blog.title}</h1>
					<div className="contents text-gray-500 leading-5">
						<p className="font-bold">by {blog.author}</p>
						<p className="font-light italic">{formatDate(blog.posting_date)}</p>
					</div>
				</div>
				{
					blog.youtube_link &&
					<iframe
						title={blog.title}
						src={blog.youtube_link}
						className="w-full aspect-video mb-4"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
				}
				<div className={styles.body} dangerouslySetInnerHTML={{
					__html: blog.body
				}} />
				<p className="text-gray-500 text-right">{new Date(blog.posting_date).toLocaleDateString()}</p>
			</article>
		</div>
	)
}
