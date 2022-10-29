import { Html, Head, Main, NextScript } from 'next/document'

const description = "DLSU Radio: Green Giant FM (GGFM) is De La Salle University-Manila&apos;s Official Radio Station, located and broadcasting live at Br. Bloemen Hall!"
const image = '/images/card-image.png'

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="description" content={description} />
				<meta name="theme-color" content="#569429" />
				<meta property="og:type" content="website" />
				<meta property="og:image" content={image} />
				<meta property="fb:app_id" content="585506388489406" />

				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:site" content="@GreenGiantFM" />
				<meta property="twitter:creator" content="@GreenGiantFM" />
				<meta property="twitter:image" content={image} />
				<meta name="google-signin-client_id" content={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID} />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
