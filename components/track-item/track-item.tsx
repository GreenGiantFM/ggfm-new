import { ITrack } from '@models/track'
import { HTMLAttributes, useEffect, useRef, useState } from 'react'
import Image from 'next/future/image'

type TrackItemProps = {
	onVote: () => void
	isVoteable: boolean
} & ITrack & HTMLAttributes<HTMLDivElement>

export function TrackItem({ _id, image, name, artists, preview_url, isVoteable, onVote, className, ...props }: TrackItemProps) {
	const [isChecked, setIsChecked] = useState(false)
	const [isPlaying, setIsPlaying] = useState(false)
	const player = useRef<HTMLMediaElement>(null)

	function onChange() {
		setIsChecked(!isChecked)
		onVote()
	}

	// player setup
	useEffect(() => {
		if (!player.current) return
		player.current.volume = 0.05
		player.current.onpause = () => setIsPlaying(false)
		player.current.onplay = () => setIsPlaying(true)
	}, [player])

	function handlePlayerClick() {
		if (!player.current) return

		if (player.current.paused) {
			player.current.play()
		} else {
			player.current.pause()
		}
	}

	return (
		<div className={`bg-white text-gray-900 flex rounded` + (className ? ` ${className}` : '')} {...props}>
			<div className="relative w-24 aspect-square">
				<Image alt={`Album cover of ${name}`} src={image} width={96} height={96} className="h-full w-full object-contain block rounded-l" />
			</div>
			<div className="px-4 py-2 flex-1">
				<div>
					<p className="font-semibold">{name}</p>
					<p className="text-sm italic line-clamp-1 h-7">{artists.join(', ')}</p>
				</div>
				<div className="flex space-x-4 children:(border-gray-500 border rounded px-4 w-full)">
					<button type="button" className={`btn white` + (isPlaying ? ' !bg-gray-300 shadow-inner' : '')} onClick={handlePlayerClick} disabled={!preview_url}>
						{
							preview_url ?
								<>
									<span>{isPlaying ? 'Pause' : 'Play'}</span>
									<audio src={preview_url} ref={player} />
								</>
								:
								<span>Unavailable</span>
						}
					</button>
					<label className={"btn focus:ring-1 cursor-pointer text-center " +
						(isChecked ? 'green' : 'white') +
						(isVoteable ? '' : ' !opacity-50 !cursor-not-allowed !hover:bg-white')}
					>
						<input type="checkbox" name="selection" className="hide" value={_id.toString()} onChange={onChange}
							disabled={!isVoteable} aria-disabled={!isVoteable} />
						<span>{isChecked ? 'Selected' : 'Vote'}</span>
					</label>
				</div>
			</div>
		</div >
	)
}