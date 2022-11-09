import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import plainText from 'remark-plain-text'

const processor = remark().use(html)
const excerptProcessor = remark().use(plainText)

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
	console.log(path.join(process.cwd(), ...dirPath))
	return await fs.readdir(path.join(process.cwd(), ...dirPath))
}

export async function getFileData<T>(filePath: string[]) {
	const data = await fs.readFile(path.join(process.cwd(), ...filePath), 'utf8')
	const matterResult = matter(data)

	return {
		id: filePath.pop()?.replace(/.md$/, '') as string,
		contentHtml: (await processor.process(matterResult.content)).toString(),
		excerpt: (await excerptProcessor.process(matterResult.content)).toString().slice(0, 280),
		...matterResult.data as T
	}
}

export async function getFirstFileData<T>(dirPath: string[]) {
	const name = (await getFiles(dirPath)).sort((a, b) => b.localeCompare(a))[0]
	return await getFileData<T>([...dirPath, name])
}

export type PostData = Awaited<ReturnType<typeof getFileData>>
