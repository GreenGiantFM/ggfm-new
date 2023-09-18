import Link from 'next/link'
import { useRouter } from 'next/router'
import { Popover, Transition } from '@headlessui/react'
import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export type NavItemProps = {
	text: string
	path: string
	isHome?: boolean
	subItems?: {
		text: string
		path: string
		description?: string
	}[]
}

export default function NavItem({ text, path, subItems }: NavItemProps) {
	const { pathname } = useRouter()
	const [show, setShow] = useState(false)
	const hasSubitems = subItems && subItems.length != 0

	return (
		<Popover onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} className="relative">
			{() => (
				<>
					<Link href={path} passHref legacyBehavior>
						<Popover.Button as="a"
							className={'hover:text-primary block transition-colors cursor-pointer relative h-full flex items-center' + (hasSubitems ? ' mr-4' : '')}
							aria-current={path == pathname ? 'page' : undefined}
						>
							{text}
							{hasSubitems && <ChevronDownIcon className="aspect-square w-4 absolute -right-5 top-6" />}
						</Popover.Button>
					</Link>

					{hasSubitems &&
						<Transition
							show={show}
							enter="transition duration-100 ease-out"
							enterFrom="transform scale-95 opacity-0"
							enterTo="transform scale-100 opacity-100"
							leave="transition duration-75 ease-out"
							leaveFrom="transform scale-100 opacity-100"
							leaveTo="transform scale-95 opacity-0"
						>
							<Popover.Panel className="grid absolute bg-white px-4 pb-2 rounded-b-md -left-4" static>
								{subItems!.map(item => (
									<Link key={item.text}
										href={item.path}
										className="hover:text-primary transition-colors h-full"
										aria-current={path == pathname ? 'page' : undefined}
									>
										{item.text}
									</Link>
								))}
							</Popover.Panel>
						</Transition>
					}
				</>
			)}
		</Popover >
	)
}

