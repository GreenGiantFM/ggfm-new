import { NextPage, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { getFileData, getFileIds } from '@lib/posts'
import Image from 'next/future/image'
import CustomHead from '@components/head'
import styles from '@styles/Post.module.css'
import { formatDate } from '@lib/utils'
import { GetStaticPaths } from 'next/types'
import { useRouter } from 'next/router'
import { BlogData } from '@pages/api/blogs'

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ blog }) => {
	const { isFallback } = useRouter()

	return (
		<div className="grid grid-cols-[minmax(40ch,70ch)] lg:grid-cols-[minmax(150px,400px)_minmax(40ch,max-content)] 
			gap-x-8 xl:gap-x-16 place-self-center md:my-16 md:mx-8 gap-y-0 md:gap-y-4"
		>
			{
				isFallback ?
					<CustomHead
						title={`GGFM | Blog`}
						description="Loading..."
						url="/blogs"
					/>
					:
					<CustomHead
						title={`${process.env.NEXT_PUBLIC_SITE_TITLE} | ${blog.title}`}
						description={blog.excerpt}
						url={`/blogs/${blog.id}`}
					/>
			}
			<aside className="relative">
				<div className="sticky top-8">
					{
						isFallback ?
							<div className="aspect-video p-4 bg-white">
								<div className="w-full h-full bg-gray-300 animate-pulse" />
							</div>
							:
							<Image alt={`Post of ${blog.title}`} src={blog.featured_image} fill className="object-contain !relative shadow-2xl block" />
					}
				</div>
			</aside>
			<article className="bg-white p-8 shadow-xl max-w-[calc(65ch+4rem)] text-gray-900">
				{
					isFallback ?
						<div className="space-y-2 animate-pulse children:bg-gray-300">
							<div className="h-6" />
							<div className="h-4 w-1/2" />
							<div className="h-4 w-2/5 !mb-4" />
							<div className="h-96 w-prose" />
						</div>
						:
						<>
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
						</>
				}
			</article>
		</div>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = await getFileIds(['posts', 'blogs'])

	return {
		paths,
		fallback: true
	}
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
	const blog = await getFileData<BlogData>(['posts', 'blogs', params?.id + '.md'])

	return {
		props: {
			blog
		}
	}
}

export default Page
