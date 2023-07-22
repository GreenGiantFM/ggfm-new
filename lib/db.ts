import mongoose from 'mongoose'
import { MongooseConnection } from '../global'

const MONGODB_URI = process.env.MONGODB_URI

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached: MongooseConnection = global.mongoose

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
	if (cached.conn) {
		return cached.conn
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: true,
		}

		if (!MONGODB_URI) {
			throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
		}
		
		mongoose.set('strictQuery', true);
		cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => mongoose)
	}

	cached.conn = await cached.promise
	console.log('ESTABLISHED CONNECTION')
	return cached.conn
}

export default dbConnect
