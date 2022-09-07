import 'windi.css'
import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Layout from '@components/layouts/main'
import { ToastContainer } from 'react-toastify'

function MyApp({
	Component,
	pageProps: { session, ...pageProps }
}: AppProps) {
	return (
		<SessionProvider session={session}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
			<ToastContainer />
		</SessionProvider>
	)
}

export default MyApp
