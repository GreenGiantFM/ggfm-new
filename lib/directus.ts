import { CustomDirectusTypes } from '@directus-collections'
import { createDirectus, rest, staticToken } from '@directus/sdk'

export const directus = createDirectus<CustomDirectusTypes>(process.env.DIRECTUS_URL)
	.with(rest({ credentials: 'include' }))
	.with(staticToken(process.env.DIRECTUS_STATIC_TOKEN))

