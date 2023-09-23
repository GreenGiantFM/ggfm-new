import { getFilesAndData } from '@lib/posts'
import { NextResponse } from 'next/server'

export type BlogData = {
	title: string
	author: string
	featured_image: string
	posting_date: string
	youtube_link?: string
	tags: string[]
}

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const data = await getFilesAndData(['posts', 'blogs'], { page: searchParams.get('page'), limit: searchParams.get('limit') })

	return NextResponse.json(data)
}