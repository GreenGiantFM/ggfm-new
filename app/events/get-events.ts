import { readItems } from "@directus/sdk"
import { directus } from "@lib/directus"
import { LIMIT } from "@lib/page-limit"
import { extractSummary } from "@lib/utils"
import { cache } from 'react'

/**
 * Used for retrieving paginated published event sorted in reverse order. The body here is the shortened version.
 * @param page - page number for pagination (1-indexed)
 * @param limit - the number of items to retrieve
 * @returns the events that fall within the specified page
 */
export const getEvents = cache(async (page: number, limit = LIMIT) => {
	let events;
	
	if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
		// Import mock data dynamically to avoid import issues
		const { mockEvents } = await import('@lib/mock-data');
		// Return mock events with pagination simulation
		const startIndex = (page - 1) * limit;
		const endIndex = startIndex + limit;
		events = mockEvents.slice(startIndex, endIndex);
	} else {
		events = await directus.request(readItems('events' as any, {
			fields: ['id', 'title', 'image', 'posting_date', 'location', 'body'],
			page,
			limit,
			sort: ['-posting_date'],
			filter: { status: { _eq: 'published' } }
		})) as any[];
	}

	(events as any[]).forEach(event => event.body = extractSummary(event.body))
	return events
})
