import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { stripHtml } from 'string-strip-html'

type PostQuery = {
	page?: string
	limit?: string
}

const processor = unified().use(remarkParse).use(remarkRehype).use(rehypeStringify)

export async function getFileIds(dirPath: string[]) {
	const fileNames = await getFiles(dirPath)

	return fileNames.map(fileName => ({
		params: {
			id: fileName.replace(/.md$/, ''),
			locale: 'en'
		}
	}))
}

export async function getFiles(dirPath: string[]) {
	return await fs.readdir(path.join(process.cwd(), ...dirPath))
}

export async function getFileData<T>(filePath: string[]) {
	const data = await fs.readFile(path.join(process.cwd(), ...filePath), 'utf8')
	const matterResult = matter(data)
	const contentHtml = String(await processor.process(matterResult.content))

	return {
		id: filePath.pop()?.replace(/.md$/, '') as string,
		contentHtml,
		excerpt: stripHtml(contentHtml).result.slice(0, 280),
		...matterResult.data as T
	}
}

export async function getFirstFileData<T>(dirPath: string[]) {
	const name = (await getFiles(dirPath)).sort((a, b) => b.localeCompare(a))[0]
	return await getFileData<T>([...dirPath, name])
}

export async function getFilesAndData<T>(dirPath: string[], query: PostQuery) {
	const page = query.page ? parseInt(query.page) : 0
	const limit = query.limit ? parseInt(query.limit) : 4
	const start = page * limit

	const files = (await getFiles(dirPath))
		.sort((a, b) => b.localeCompare(a))
		.slice(start, start + limit)

	return await Promise.all(
		files.map(fileName => getFileData<T>(dirPath.concat(fileName)))
	)
}

export type PostData = Awaited<ReturnType<typeof getFileData>>

