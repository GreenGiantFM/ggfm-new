import { NextPage, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { getFileData, getFileIds } from '@lib/posts'
import { EventData } from '@pages/api/events'
import Image from 'next/future/image'
import CustomHead from '@components/head'
import styles from '@styles/Post.module.css'
import { formatDate } from '@lib/utils'
import { GetStaticPaths } from 'next/types'
import { useRouter } from 'next/router'

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ event }) => {
	const { isFallback } = useRouter()

	return (
		<div className="grid lg:grid-cols-[minmax(150px,400px)_minmax(40ch,max-content)] gap-x-8 xl:gap-x-16 place-self-center md:my-16 md:mx-8">
			{
				isFallback ?
					<CustomHead
						title={`GGFM | Event`}
						description="Loading..."
						url="/events"
					/>
					:
					<CustomHead
						title={`${process.env.NEXT_PUBLIC_SITE_TITLE} | ${event.title}`}
						description={event.excerpt}
						url={`/events/${event.id}`}
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
							<Image alt={`Post of ${event.title}`} src={event.featured_image} fill className="object-contain !relative shadow-2xl block" />
					}
				</div>
			</aside>
			<article className="bg-white p-8 shadow-xl max-w-[calc(65ch+4rem)] text-gray-900 ">
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
								<h1 className="text-5xl mb-1">{event.title}</h1>
								<div className="contents text-gray-500 italic font-light leading-5">
									<p>{formatDate(event.start_date)} {event.end_date ? ` - ${formatDate(event.end_date!)}` : ''}</p>
									{event.time && <p>{event.time}</p>}
								</div>
							</div>
							<div className={styles.body} dangerouslySetInnerHTML={{
								__html: event.contentHtml
							}} />
							<p className="text-gray-500 text-right">{new Date(event.posting_date).toLocaleDateString()}</p>
						</>
				}

			</article>
		</div>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = await getFileIds('/posts/events')

	return {
		paths,
		fallback: true
	}
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
	const event = await getFileData<EventData>(`/posts/events/${params?.id}.md`)

	if (!event) {
		console.log("WHAT", params)
	}

	return {
		props: {
			event
		}
	}
}

export default Page
