
import { getFilesAndData } from '@lib/posts'
import { Post } from '@components/post'
import { RemainingEvents } from './remaining-events.'
import { LIMIT } from '@lib/page-limit'
import { EventData } from './api/route'

async function getData() {
	const events = await getFilesAndData<EventData>(['posts', 'events'], {
		page: '0',
		limit: LIMIT.toString(),
	})

	return events
}

export const metadata = {
	title: 'Events',
	description: 'Events covered by Green Giant FM',
}

export default async function EventsPage() {
	const events = await getData()

	return (
		<div className="max-w-screen-xl w-full px-6 sm:px-16 my-8 justify-self-center">
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
					<RemainingEvents />
				</section>
				<aside className="col-start-9 col-span-3 row-start-1 hidden lg:block">
					<h1 className="sticky top-8 text-white text-6xl text-center">EVENTS</h1>
				</aside>
			</div>
		</div>
	)
}
