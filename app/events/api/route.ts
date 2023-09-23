import { getFilesAndData } from '@lib/posts'
import { NextResponse } from 'next/server'

export type EventData = {
	title: string
	location: string
	start_date: string
	end_date?: string
	time?: string
	featured_image: string
	posting_date: string
	tags: string[]
}

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const data = await getFilesAndData(['posts', 'events'], { page: searchParams.get('page'), limit: searchParams.get('limit') })

	return NextResponse.json(data)
}