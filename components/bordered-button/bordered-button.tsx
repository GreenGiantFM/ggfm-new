import { ArrowRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { ButtonHTMLAttributes, LinkHTMLAttributes } from 'react'

const classname = `block px-8 py-2 rounded-full border mx-auto border-white flex items-center 
justify-center text-sm group transition-colors`
const arrow = <ArrowRightIcon className="aspect-square w-4 ml-2 transform transition-transform group-hover:translate-x-2" />

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
		<Link className={classname + (className ? ` ${className}` : '')} {...props} href={href}>
			{children}
			{arrow}
		</Link>
	)
}