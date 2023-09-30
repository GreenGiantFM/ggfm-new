declare global {
	interface Window {
		google: any;
	}

	namespace NodeJS {
		interface ProcessEnv {
			VERCEL_URL: string
			NEXT_PUBLIC_GOOGLE_CLIENT_ID: string
			SPOTIFY_ID: string
			SPOTIFY_SECRET: string
			NEXT_PUBLIC_ASSETS_URL: string
			DIRECTUS_URL: string
			DIRECTUS_STATIC_TOKEN: string
		}
	}
}

export { }