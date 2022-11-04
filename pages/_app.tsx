import 'windi.css'
import '@styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@components/layouts/main'

function MyApp({
	Component,
	pageProps
}: AppProps) {
	return (
		<Layout>
			{/* KEEP THIS HERE! This makes sure that windi loads the animate-spin keyframes for some reason. <div className="hidden animate-spin"></div> */}
			<Component {...pageProps} />
		</Layout>
	)
}

export default MyApp
