import { Html, Head, Main, NextScript } from 'next/document'

const canonical = 'https://greengiantfm.com/'
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

				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,400;0,600;1,600&display=swap" rel="stylesheet" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
