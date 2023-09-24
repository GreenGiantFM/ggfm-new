import dbConnect from '@lib/db'
import { isValidHost } from '@lib/utils'

import { NextResponse } from 'next/server'
import HuntVote from '@models/hunt-vote'

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

	await dbConnect()
	const count = await HuntVote.countDocuments({ email })
	if (count) return NextResponse.json('You have already voted!', { status: 401 })

	await HuntVote.insertMany(selection.map(candidate => ({ email, candidate })))
	return NextResponse.json('')
}
