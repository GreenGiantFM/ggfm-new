import dbConnect from "@lib/db"
import { isValidHost } from "@lib/utils"
import { NextResponse } from "next/server"
import TrackVote from '@models/track-vote'

type Body = {
	email?: string
	selection?: string[]
}

export async function POST(req: Request) {
	const { email, selection } = await req.json() as Body

	if (!isValidHost(req.headers.get('host'))) {
		return NextResponse.json(``, { status: 403 })
	}

	if (!email) return NextResponse.json('You are not logged in!', { status: 401 })
	if (!selection) return NextResponse.json('No songs were selected.', { status: 401 })

	await dbConnect()
	const count = await TrackVote.countDocuments({ email })
	if (count) return NextResponse.json('You have already voted!', { status: 401 })

	await TrackVote.insertMany(selection.map(track => ({ email, track })))
	return NextResponse.json('Success')
}
