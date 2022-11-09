import axios from 'axios'

export const app = axios.create({
	headers: {
		'Access-Control-Allow-Credentials': 'true',
	},
})

export async function fetcher<T>(url: string) {
	return (await app.get<T>(url)).data
}
