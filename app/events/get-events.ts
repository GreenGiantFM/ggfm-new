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
	const events = await directus.request(readItems('events', {
		fields: ['id', 'title', 'image', 'posting_date', 'location', 'body'],
		page,
		limit,
		sort: ['-posting_date'],
		filter: { status: { _eq: 'published' } }
	}))
	events.forEach(event => event.body = extractSummary(event.body))
	return events
})
