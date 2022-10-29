import mongoose from 'mongoose'

export type MongooseConnection = {
	conn: typeof mongoose | null;
	promise: Promise<typeof mongoose> | null;
}

declare global {
	var mongoose: MongooseConnection

	interface Window {
		google: any;
	}

	namespace NodeJS {
		interface ProcessEnv {
			NEXT_PUBLIC_SITE_TITLE: string
			NEXT_PUBLIC_VERCEL_URL: string
			NEXT_PUBLIC_API_BASE_URL: string
			MONGODB_URI: string
			NEXT_PUBLIC_GOOGLE_CLIENT_ID: string
		}
	}
}

export { }