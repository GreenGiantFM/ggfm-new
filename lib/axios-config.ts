import axios from 'axios'

export const app = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	headers: {
		'Access-Control-Allow-Credentials': 'true',
	},
})

export async function fetcher<T>(url: string) {
	return (await app.get<T>(url)).data
}
