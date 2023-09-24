import { NavItemProps } from '@lib/nav-items'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type MobNavItemProps = NavItemProps & {
	onClick: () => void
}

export function MobNavItem({ text, path, onClick }: MobNavItemProps) {
	const pathname = usePathname()

	return (
		<Link href={path} className="border-l-2 block px-3 py-2 text-2xl hover:text-primary transition-colors"
			aria-current={pathname == path ? 'page' : undefined}
			onClick={onClick}
		>
			{text}
		</Link>
	)
}