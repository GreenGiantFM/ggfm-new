import { readItems } from '@directus/sdk'
import { directus } from '@lib/directus'
import { LIMIT } from '@lib/page-limit'
import { extractSummary } from '@lib/utils'
import { cache } from 'react'

/**
 * Used for retrieving paginated published blogs sorted in reverse order. The body here is the shortened version.
 * @param page - page number for pagination (1-indexed)
 * @param limit - the number of items to retrieve
 * @returns the blogs that fall within specified page
 */
export const getBlogs = cache(async (page: number, limit = LIMIT) => {
	const blogs = await directus.request(readItems('blogs', {
		fields: ['id', 'title', 'image', 'posting_date', 'body'],
		page,
		limit,
		sort: ['-posting_date'],
		filter: { status: { _eq: 'published' } }
	}))
	blogs.forEach(blog => blog.body = extractSummary(blog.body))
	return blogs
})
