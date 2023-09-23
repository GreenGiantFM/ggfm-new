import { getFileData, getFileIds } from '@lib/posts'
import Image from 'next/image'
import styles from '@styles/Post.module.css'
import { formatDate } from '@lib/utils'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { EventData } from '../api/route'

type EventPageProps = {
	params: {
		id: string
	}
}

async function getData(params: EventPageProps['params']) {
	return await getFileData<EventData>(['posts', 'events', params.id + '.md'])
}

export async function generateStaticParams() {
	return await getFileIds(['posts', 'events'])
}

export async function generateMetadata({ params }: EventPageProps, parent: ResolvingMetadata): Promise<Metadata> {
	const [event, awaitedParent] = await Promise.all([getData(params), parent])

	if (!event) notFound()

	const prevImages = awaitedParent.openGraph?.images || []

	return {
		title: event.title,
		description: event.excerpt,
		openGraph: {
			images: [event.featured_image, ...prevImages]
		}
	} as Metadata
}

export default async function EventPage({ params }: EventPageProps) {
	const event = await getData(params)

	if (!event) notFound()

	return (
		<div className="grid grid-cols-[minmax(40ch,70ch)] lg:grid-cols-[minmax(150px,400px)_minmax(40ch,max-content)] 
			gap-x-8 xl:gap-x-16 place-self-center md:my-16 md:mx-8 gap-y-0 md:gap-y-4"
		>
			<aside className="relative">
				<div className="sticky top-8">
					<Image alt={`Post of ${event.title}`} src={event.featured_image} fill className="object-contain !relative shadow-2xl block" />
				</div>
			</aside>
			<article className="bg-white p-8 shadow-xl max-w-[calc(65ch+4rem)] text-gray-900">
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
			</article>
		</div>
	)
}
