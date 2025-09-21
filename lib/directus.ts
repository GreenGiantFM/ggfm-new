import { CustomDirectusTypes } from '@directus-collections'
import { createDirectus, rest, staticToken } from '@directus/sdk'
import { mockDirectusClient, USE_MOCK_DATA } from './mock-directus'

const realDirectus = createDirectus<CustomDirectusTypes>(process.env.DIRECTUS_URL!)
	.with(rest({ credentials: 'include' }))
	.with(staticToken(process.env.DIRECTUS_STATIC_TOKEN!))

// Create a proxy that intercepts directus.request calls
export const directus = {
	request: async (operation: any) => {
		if (USE_MOCK_DATA) {
			console.log(`[MOCK] Intercepting operation:`, operation);
			
			// Check for readItems operations
			if (operation.collection && operation.query !== undefined) {
				console.log(`[MOCK] ReadItems for ${operation.collection}`);
				return mockDirectusClient.readItems(operation.collection, operation.query);
			}
			
			// Check for aggregate operations - they have collection and aggregate properties
			if (operation.collection && operation.aggregate !== undefined) {
				console.log(`[MOCK] Aggregate for ${operation.collection}`);
				return mockDirectusClient.aggregate(operation.collection, operation);
			}
			
			// Check for createItems operations - they have collection and items properties
			if (operation.collection && operation.items !== undefined) {
				console.log(`[MOCK] CreateItems for ${operation.collection}`);
				return mockDirectusClient.createItems(operation.collection, operation.items);
			}
			
			// Fallback for unknown operations
			console.warn('[MOCK] Unknown operation type:', operation);
			return [];
		}
		
		// Use real Directus client when not in mock mode
		return realDirectus.request(operation);
	}
}

