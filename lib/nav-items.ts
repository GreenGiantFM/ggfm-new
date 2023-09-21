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