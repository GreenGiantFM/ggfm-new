import axios from 'axios'

const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }

/**
 * Standard date formatter for the application.
 * @param date - a date object or date string to format
 * @returns a string equivalent of the date in the form 'MMM-DD-YYYY'
 */
export function formatDate(date: Date | string) {
	if (typeof date == 'string') {
		date = new Date(date)
	}

	return date.toLocaleDateString('en-US', dateOptions)
}

/**
 * Utility function for retrieving an axios error message in TypeScript
 * @param error - an error object of unknown type
 */
export function getAxiosError(error: unknown) {
	if (axios.isAxiosError(error)) {
		return error.response?.data as string ?? error.message
	}

	return 'An error has occured!'
}

/**
 * Parses a given number of milliseconds into a duration in days, hours, minutes, and seconds
 * @param timestamp - the number of miliseconds to parse
 * @returns an object containing the days, hours, minutes, seconds
 */
export function parseUnitTime(timestamp: number) {
	return {
		days: Math.floor(timestamp / 86400000),
		hours: Math.floor((timestamp % 86400000) / 3600000),
		minutes: Math.floor((timestamp % 3600000) / 60000),
		seconds: Math.floor((timestamp % 60000) / 1000),
	}
}

/**
 * Serializes an object, mostly used for api's that require application/x-www-form-urlencoded content type
 * @param object - a record type object to be serialized
 * @returns a string that represents the serialized version of the object
 */
export function serialize(object: Record<string, string>) {
	const params = []

	for (const p in object) {
		if (object.hasOwnProperty(p)) {
			params.push(`${encodeURIComponent(p)}=${encodeURIComponent(object[p])}`)
		}
	}
	return params.join("&")
}

/**
 * Checks if the a host is within the list of permitted origins
 * @param host - request host
 * @returns if host is a valid origin
 */
export function isValidHost(host: string | undefined) {
	return host == process.env.NEXT_PUBLIC_VERCEL_URL ||
		host == 'test.greengiantfm.com' ||
		host == 'www.greengiantfm.com' ||
		host == 'greengiantfm.com'
}

/**
 * Used for filtering falsy items with type guard
 * @param item Any item in an array of same objects
 * @returns boolean value of the item
 */
export function filterFalsy<T>(item?: T | null): item is T {
	return !!item
}
