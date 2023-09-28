import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

type RevalidateRoute = {
	path: string
	isLayout?: boolean
}

export async function POST(req: NextRequest) {
	const routes: RevalidateRoute[] = await req.json()

	console.log(req.headers.get('host'))

	if (!routes) {
		return NextResponse.json({
			revalidated: false,
			now: Date.now(),
			message: 'Missing path to revalidate',
		}, { status: 401 })
	}

	for (let i = 0; i < routes.length; i++) {
		revalidatePath(routes[i].path, routes[i].isLayout ? 'layout' : 'page')
	}

	return NextResponse.json({ revalidated: true, now: Date.now() })
}
