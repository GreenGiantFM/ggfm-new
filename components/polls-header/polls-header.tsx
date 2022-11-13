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
	return (
		<div className="bg-neutral-900 flex flex-col space-y-2 items-center py-4 h-[fit-content]">
			<h1 className="text-8xl">{name}</h1>
			<Countdown start={start} end={end} />
			<div className="children:px-8 font-primary text-4xl py-4">
				<Link href={root}>
					<a className="white border-r-2 border-white">VOTE</a>
				</Link>
				<Link href={root + '/polls'}>
					<a className="white">LIVE POLLS</a>
				</Link>
			</div>
		</div>
	)
}
