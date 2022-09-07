import Head from 'next/head'
import Header, { navItems } from '../header'
import Link from 'next/link'
import Image from 'next/image'

type LayoutProps = {
	children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<Header />
			<main className="main-height grid">
				{children}
			</main>
			<footer className="bg-neutral-700 py-8 px-4 text-white font-secondary">
				<div className="flex justify-between container mx-auto">
					<div className="grid grid-cols-4 justify-items-center items-start gap-y-4">
						<Link href="/">
							<a className="col-span-full md:col-span-1">
								<Image src="/images/logo.png" alt="GGFM Logo" width={192} height={72} />
							</a>
						</Link>
						<div className="col-span-2 md:col-span-1">
							<h6 className="underline uppercase text-2xl">Address</h6>
							<p>Br. Bloemen Hall, De La Salle University, 2401 Taft Ave., Malate, Manila, 1004 Metro Manila</p>
						</div>
						<div className="col-span-2 md:col-span-1">
							<h6 className="underline uppercase text-2xl">Explore</h6>
							<div className="flex flex-col">
								{navItems.flatMap(nav => (
									<Link key={nav.path} href={nav.path}>
										<a className="text-primary hover:text-white transition-colors">{nav.text}</a>
									</Link>
								))}
							</div>
						</div>
						<div className="grid justify-items-center gap-y-2 col-span-full md:col-span-1">
							<p className="text-center">Accredited by the Student Media Office</p>
							<Image src="/images/dlsu-smo-white.png" alt="DLSU SMO Logo" width={192} height={76.5} />
						</div>
					</div>
				</div>
			</footer>
		</>
	)
}

export default Layout
