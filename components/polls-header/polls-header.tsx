import dynamic from 'next/dynamic'
import Link from 'next/link'

const HeaderCountdown = dynamic(() => import('./header-countdown'), { ssr: false, loading: () => <div className='h-16' /> })

type PollsHeaderProps = {
	name: string
	start: Date
	end: Date
	root: string
	showPolls?: boolean
}

export function PollsHeader({ name, start, end, root, showPolls }: PollsHeaderProps) {
	return (
		<div className="bg-neutral-900 flex flex-col space-y-2 items-center py-6 h-[fit-content]">
			<h1 className="text-8xl">{name}</h1>
			<HeaderCountdown start={start} end={end} />
			{
				showPolls &&
				<div className="children:px-8 font-primary text-4xl py-4 divide-x-2">
					<Link href={root}>VOTE</Link>
					<Link href={root + '/polls'}>LIVE POLLS</Link>
				</div>
			}
		</div>
	)
}
