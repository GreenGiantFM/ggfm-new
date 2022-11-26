import Link from 'next/link'
import dynamic from 'next/dynamic'
import { CountdownProps } from '@components/countdown/countdown'

type PollsHeaderProps = {
	name: string
	start: Date
	end: Date
	root: string
}

const Countdown = dynamic<CountdownProps>(() => import('@components/countdown').then(mod => mod.Countdown), {
	loading: () => <div className="h-16" />,
	ssr: false
})

export function PollsHeader({ name, start, end, root }: PollsHeaderProps) {
	const curr = new Date().getTime()
	return (
		<div className="bg-neutral-900 flex flex-col space-y-2 items-center py-6 h-[fit-content]">
			<h1 className="text-8xl">{name}</h1>
			{curr < start.getTime() ?
				<>
					<p>Polls are opening in...</p>
					<Countdown target={start} />
				</>
				:
				<>
					{curr < end.getTime() && <p>Polls are closing in...</p>}
					<Countdown target={end} />
				</>
			}

			{
				root !== '/dj-hunt' &&
				<div className="children:px-8 font-primary text-4xl py-4 divide-x-2">
					<Link href={root}>
						<a>VOTE</a>
					</Link>

					<Link href={root + '/polls'}>
						<a>LIVE POLLS</a>
					</Link>
				</div>
			}
		</div>
	)
}
