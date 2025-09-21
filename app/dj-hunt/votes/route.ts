import { aggregate, createItems } from '@directus/sdk'
import { directus } from '@lib/directus'
import { isValidHost } from '@lib/utils'
import { NextResponse } from 'next/server'
import { mockDirectusClient, USE_MOCK_DATA } from '@lib/mock-directus'

type Body = {
	email?: string
	selection?: string[]
}

export async function POST(req: Request) {
	const { email, selection } = await req.json() as Body

	if (!isValidHost(req.headers.get('host'))) {
		return NextResponse.json('', { status: 403 })
	}

	if (!email) return NextResponse.json('You are not logged in.', { status: 401 })
	if (!selection) return NextResponse.json('No candidate selected.', { status: 401 })

	// Use mock client directly in development to bypass the directus proxy
	let count;
	if (USE_MOCK_DATA) {
		const result = await mockDirectusClient.aggregate('hunt_votes', {
			query: {
				filter: { email: { _eq: email } }
			}
		});
		count = (result[0] as any)?.count || 0;
	} else {
		const result = await directus.request(aggregate('hunt_votes' as any, {
			aggregate: { count: '*' },
			query: {
				filter: { email: { _eq: email } }
			}
		})) as any[];
		count = result[0]?.count || 0;
	}

	if (count) return NextResponse.json('You have already voted!', { status: 401 })

	if (USE_MOCK_DATA) {
		await mockDirectusClient.createItems('hunt_votes', selection.map(s => ({ candidate: parseInt(s), email })));
	} else {
		await directus.request(createItems('hunt_votes' as any, selection.map(s => ({ candidate: parseInt(s), email }))));
	}
	
	return NextResponse.json('')
}
