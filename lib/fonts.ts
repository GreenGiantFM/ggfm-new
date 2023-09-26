import localFont from 'next/font/local'
import { Raleway } from 'next/font/google'

export const kenyanCofee = localFont({
	src: [
		{
			path: '../public/fonts/kenyan-coffee/400.woff2',
			weight: '400',
		},
		{
			path: '../public/fonts/kenyan-coffee/700.woff2',
			weight: '700',
		}
	],
	weight: 'normal',
	display: 'swap',
	variable: '--font-primary'
})

export const raleway = Raleway({
	weight: ['300', '400', '600'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-secondary',
})

export const nextFont = localFont({
	src: '../public/fonts/the-next-font.woff2',
	style: 'normal',
	weight: '400',
	display: 'swap',
	variable: '--font-next'
})