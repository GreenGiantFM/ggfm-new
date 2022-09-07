import Link from 'next/link'
import { useRouter } from 'next/router'
import { NavItemProps } from './nav-item'

type MobNavItemProps = NavItemProps & {
	onClick: () => void
}

export function MobNavItem({ text, path, onClick }: MobNavItemProps) {
	const { pathname } = useRouter()

	return (
		<Link href={path}>
			<a
				className="border-l-2 block px-3 py-2 text-2xl hover:text-primary transition-colors"
				aria-current={pathname == path ? 'page' : undefined}
				onClick={onClick}
			>
				{text}
			</a>
		</Link>
	)
}