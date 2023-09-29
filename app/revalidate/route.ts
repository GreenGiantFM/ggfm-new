import { isValidHost } from '@lib/utils'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

type RevalidateRoute = { layout: string } | string

export async function POST(req: NextRequest) {
	const routes: RevalidateRoute[] = await req.json()

	console.log({ host: req.headers.get('host') })
	console.log(process.env.DIRECTUS_STATIC_TOKEN)

	if (!isValidHost(req.headers.get('host'))) {
		return NextResponse.json('Invalid host!', { status: 403 })
	}

	if (!routes) {
		return NextResponse.json({
			revalidated: false,
			now: Date.now(),
			message: 'Missing path to revalidate',
		}, { status: 401 })
	}

	routes.forEach(route => {
		if (typeof route === 'string') {
			return revalidatePath(route)
		}

		if (route.layout) {
			revalidatePath(route.layout, 'layout')
		}
	})

	return NextResponse.json({ revalidated: true, now: Date.now() })
}
