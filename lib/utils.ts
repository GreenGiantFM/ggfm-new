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
 * @param timestamp the number of miliseconds to parse
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
