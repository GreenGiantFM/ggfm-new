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
	let blogs;
	
	if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
		// Import mock data dynamically to avoid import issues
		const { mockBlogs } = await import('@lib/mock-data');
		// Return mock blogs with pagination simulation
		const startIndex = (page - 1) * limit;
		const endIndex = startIndex + limit;
		blogs = mockBlogs.slice(startIndex, endIndex);
	} else {
		blogs = await directus.request(readItems('blogs' as any, {
			fields: ['id', 'title', 'image', 'posting_date', 'body'],
			page,
			limit,
			sort: ['-posting_date'],
			filter: { status: { _eq: 'published' } }
		})) as any[];
	}

	(blogs as any[]).forEach(blog => blog.body = extractSummary(blog.body))
	return blogs
})
