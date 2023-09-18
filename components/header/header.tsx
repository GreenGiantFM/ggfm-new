import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Disclosure, Transition } from '@headlessui/react'
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline'
import NavItem, { NavItemProps } from './nav-item'
import { MobNavItem } from './mob-nav-item'

export const navItems: NavItemProps[] = [
	{ path: '/about-us', text: 'About Us' },
	{ path: '/radio-talents', text: 'Radio Talents' },
	{
		path: '/events',
		text: 'Posts',
		subItems: [
			{ path: '/events', text: 'Events' },
			{ path: '/blogs', text: 'Blogs' },
			// { path: '/lifestyle', text: 'Lifestyle' },
		]
	},
	{
		path: '/hitlists',
		text: 'Polls',
		subItems: [
			{ path: '/hitlists', text: 'Hitlists' },
			{ path: '/dj-hunt', text: 'DJ Hunt' },
		]
	},
]

const Header: FC = () => {
	return (
		<header className="h-16 relative z-50">
			<Disclosure as="nav" className="bg-white h-full font-primary text-neutral-900 text-3xl uppercase">
				{({ open, close }) => (
					<>
						<div className="container mx-auto px-2 sm:px-6 h-full">
							<div className="relative flex items-center justify-between h-full">
								<div className="absolute inset-y-0 left-0 flex items-center md:hidden">
									<Disclosure.Button
										className="inline-grid place-items-center cursor-pointer p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-neutral-300 bg-white"
										aria-controls="mobile-menu"
										aria-expanded={open}
									>
										<span className="sr-only">Open main menu</span>
										{open ? <XMarkIcon className="h-6 w-6" aria-hidden="false" /> : <Bars3Icon className="h-6 w-6" aria-hidden="true" />}
									</Disclosure.Button>
								</div>

								<div className="flex-1 md:flex-grow-0 flex items-center h-full justify-center md:items-stretch md:justify-start">
									<Link className="flex-shrink-0 flex items-center cursor-pointer" href="/">
										<Image className="block w-auto" src="/images/logo-black.png" alt="GGFM Logo" width={144} height={54} />
									</Link>
								</div>
								<div className="hidden md:block h-full">
									<div className="flex space-x-10 h-full">
										{navItems.flatMap(nav => <NavItem key={nav.path} {...nav} />)}
									</div>
								</div>
							</div>
						</div>
						<Transition
							enter="transition duration-100 ease-out"
							enterFrom="transform scale-95 opacity-0"
							enterTo="transform scale-100 opacity-100"
							leave="transition duration-75 ease-out"
							leaveFrom="transform scale-100 opacity-100"
							leaveTo="transform scale-95 opacity-0"
						>
							<Disclosure.Panel className="md:hidden relative bg-white">
								<div className="px-2 pt-2 pb-3 space-y-1">
									{/* psuedo flatmap */}
									{navItems.reduce((items, nav) => items.concat(nav.subItems ? nav.subItems : nav), [] as NavItemProps[])
										.map(nav => <MobNavItem key={nav.path} {...nav} onClick={close} />)
									}
								</div>
							</Disclosure.Panel>
						</Transition>
					</>
				)}
			</Disclosure>
		</header>
	)
}

export default Header
