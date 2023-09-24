import { ResolvingMetadata, Metadata } from 'next'
import { getFileData, getFileIds } from '@lib/posts'
import Image from 'next/image'
import styles from '@styles/Post.module.css'
import { formatDate } from '@lib/utils'
import { notFound } from 'next/navigation'
import { BlogData } from '../api/route'

export async function generateStaticParams() {
	return await getFileIds(['posts', 'blogs'])
}

type BlogPageProps = {
	params: {
		id: string
	}
}

async function getData(params: BlogPageProps['params']) {
	return await getFileData<BlogData>(['posts', 'blogs', params?.id + '.md'])
}

export async function generateMetadata({ params }: BlogPageProps, parent: ResolvingMetadata): Promise<Metadata> {
	const [blog, awaitedParent] = await Promise.all([getData(params), parent])

	if (!blog) notFound()

	const prevImages = awaitedParent.openGraph?.images || []

	return {
		title: blog.title,
		description: blog.excerpt,
		openGraph: {
			images: [blog.featured_image, ...prevImages]
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
				<div className="sticky top-8">
					<Image alt={`Post of ${blog.title}`} src={blog.featured_image} fill className="object-contain !relative shadow-2xl block" />
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
					__html: blog.contentHtml
				}} />
				<p className="text-gray-500 text-right">{new Date(blog.posting_date).toLocaleDateString()}</p>
			</article>
		</div>
	)
}
