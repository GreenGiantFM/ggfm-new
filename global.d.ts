declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NEXT_PUBLIC_SITE_TITLE: string
			NEXT_PUBLIC_VERCEL_URL: string
			NEXT_PUBLIC_API_BASE_URL: string
		}
	}
}

export { }