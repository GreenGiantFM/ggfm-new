import { aggregate, createItems } from '@directus/sdk'
import { directus } from '@lib/directus'
import { isValidHost } from '@lib/utils'
import { NextResponse } from 'next/server'

type Body = {
	email?: string
	selection?: string[]
}

export async function POST(req: Request) {
	const { email, selection } = await req.json() as Body

	if (!isValidHost(req.headers.get('host'))) {
		return NextResponse.json('', { status: 403 })
	}

	console.log(selection)

	if (!email) return NextResponse.json('You are not logged in.', { status: 401 })
	if (!selection) return NextResponse.json('No candidate selected.', { status: 401 })

	const [{ count }] = await directus.request(aggregate('hunt_votes', {
		aggregate: { count: '*' },
		query: {
			filter: { email: { _eq: email } }
		}
	}))

	if (count) return NextResponse.json('You have already voted!', { status: 401 })

	await directus.request(createItems('hunt_votes', selection.map(s => ({ candidate: parseInt(s), email }))))
	return NextResponse.json('')
}
