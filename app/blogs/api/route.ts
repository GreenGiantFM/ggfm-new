import { NextResponse } from 'next/server'
import { getBlogs } from '../get-blogs'

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const page = searchParams.get('page')
	const limit = searchParams.get('limit')

	if (!page || !limit) return NextResponse.json([])

	try {
		return NextResponse.json(await getBlogs(parseInt(page), parseInt(limit)))
	} catch {
		return NextResponse.json([])
	}
}