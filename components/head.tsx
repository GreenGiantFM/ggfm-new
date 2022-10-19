import Head from 'next/head'

type CustomHeadProps = {
	title: string
	description: string
	url: string
}

export default function CustomHead({ title, description, url }: CustomHeadProps) {
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="og:title" content={title} />
			<meta name="og:description" content={description} />
			<meta name="og:url" content={process.env.NEXT_PUBLIC_VERCEL_URL + url} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
		</Head>
	)
}
