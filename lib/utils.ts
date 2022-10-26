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
