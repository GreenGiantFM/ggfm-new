import { ArrowRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { ButtonHTMLAttributes, LinkHTMLAttributes } from 'react'

const classname = 'block px-8 py-2 rounded-full border mx-auto border-white flex items-center justify-center text-sm'
const arrow = <ArrowRightIcon className="aspect-square w-4 ml-2" />

type BorderedButtonProps = {
	children: React.ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export function BorderedButton({ children, className, ...props }: BorderedButtonProps) {
	return (
		<button className={classname + (className ? ` ${className}` : '')} {...props}>
			{children}
			{arrow}
		</button>
	)
}

type BorderedLinkProps = {
	children: React.ReactNode
	href: string
} & LinkHTMLAttributes<HTMLAnchorElement>

export function BorderedLink({ children, href, className, ...props }: BorderedLinkProps) {
	return (
		<Link href={href}>
			<a className={classname + (className ? ` ${className}` : '')} {...props}>
				{children}
				{arrow}
			</a>
		</Link>
	)
}