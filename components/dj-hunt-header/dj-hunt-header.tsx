import Link from 'next/link'
import dynamic from 'next/dynamic'

type DJHuntHeaderProps = {
	endDate: Date
}

const Countdown = dynamic(() => import('@components/countdown').then(mod => mod.Countdown), {
	loading: () => <div className="h-16" />,
	ssr: false
})

export function DJHuntHeader({ endDate }: DJHuntHeaderProps) {
	return (
		<div className="bg-neutral-900 flex flex-col space-y-2 items-center py-4 h-[fit-content]">
			<h1 className="text-8xl">DJ HUNT</h1>
			<Countdown end={endDate} />
			<div className="children:px-8 font-primary text-4xl py-4">
				<Link href="/dj-hunt">
					<a className="white border-r-2 border-white">VOTE</a>
				</Link>
				<Link href="/dj-hunt/polls">
					<a className="white">LIVE POLLS</a>
				</Link>
			</div>
		</div>
	)
}
