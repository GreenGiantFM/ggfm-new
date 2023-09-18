import Header, { navItems } from '../header'
import Link from 'next/link'
import Image from 'next/image'
import SMO from '@public/images/dlsu-smo-white.png'
import { StreamBar } from '@components/stream-bar'

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
						<Link className="col-span-full md:col-span-1" href="/">
							<Image src="/images/logo.png" alt="GGFM Logo" width={192} height={72} />
						</Link>
						<div className="col-span-2 md:col-span-1">
							<p className="underline uppercase text-2xl font-primary">Address</p>
							<p>Br. Bloemen Hall, De La Salle University, 2401 Taft Ave., Malate, Manila, 1004 Metro Manila</p>
						</div>
						<div className="col-span-2 md:col-span-1">
							<p className="underline uppercase text-2xl font-primary">Explore</p>
							<div className="flex flex-col">
								{navItems.flatMap(nav => (
									<Link key={nav.path} href={nav.path} className="text-white hover:text-white transition-colors hover:underline">
										{nav.text}
									</Link>
								))}
							</div>
						</div>
						<div className="grid justify-items-center gap-y-2 col-span-full md:col-span-1 text-center">
							<p>Contact us at <a href="mailto:publicrelations.ggfm@gmail.com" className="underline break-all lg:break-normal">publicrelations.ggfm@gmail.com</a></p>
							<div>
								<p>Accredited by the Student Media Office</p>
								<Image src={SMO} alt="DLSU SMO Logo" className="h-auto w-48" priority={true} />
							</div>
						</div>
					</div>
				</div>
			</footer>
			<StreamBar />
		</>
	)
}

export default Layout
