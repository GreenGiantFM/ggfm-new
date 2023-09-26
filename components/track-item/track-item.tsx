import { HTMLAttributes, experimental_useEffectEvent, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { usePlayerStore } from '@stores/player-store'
import { SpotifyTracks } from '@directus-collections'

type TrackItemProps = {
	onVote: () => void
	isVoteable: boolean
	index: number
} & SpotifyTracks & Omit<HTMLAttributes<HTMLDivElement>, 'id'>

export function TrackItem({ id, image, name, artists, preview_url, isVoteable, onVote, className, index, ...props }: TrackItemProps) {
	const [isChecked, setIsChecked] = useState(false)
	const [isPlaying, setIsPlaying] = useState(false)
	const player = useRef<HTMLMediaElement>(null)
	const playerNumber = usePlayerStore(state => state.playerNumber)
	const setPlayerNumber = usePlayerStore(state => state.setPlayerNumber)
	const volume = usePlayerStore(state => state.volume)

	function onChange() {
		setIsChecked(!isChecked)
		onVote()
	}

	useEffect(() => {
		if (playerNumber != index) player.current?.pause()
	}, [playerNumber, player, index])

	// player setup
	useEffect(() => {
		if (!player.current) return
		player.current.onpause = () => setIsPlaying(false)
		player.current.onplay = () => {
			setPlayerNumber(index)
			setIsPlaying(true)
		}
	}, [player, setPlayerNumber, index])

	useEffect(() => {
		if (!player.current) return
		player.current.volume = volume
	}, [player, volume])

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
				<Image alt={`Album cover of ${name}`} src={image} width={96} height={96} className="h-full w-full object-cover block rounded-l" />
			</div>
			<div className="px-4 py-2 flex-1 flex flex-col justify-between">
				<div>
					<a href={`https://open.spotify.com/track/${id}`} target="_blank" rel="noreferrer" className="font-semibold line-clamp-1 hover:underline">{name}</a>
					<p className="text-sm italic line-clamp-1">{(artists as Array<string>).join(', ')}</p>
				</div>
				<div className="flex space-x-1 children:(border-gray-500 border rounded px-4 w-full)">
					<button type="button" className={`btn white !p-0 !disabled:opacity-50` + (isPlaying ? ' !bg-gray-300 shadow-inner' : '')} onClick={handlePlayerClick} disabled={!preview_url}>
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
					<label className={"btn focus:ring-1 cursor-pointer text-center !p-0 " +
						(isChecked ? 'green' : 'white') +
						(isVoteable ? '' : ' !opacity-50 !cursor-not-allowed !hover:bg-white')}
					>
						<input type="checkbox" name="selection" className="hide" value={id} onChange={onChange}
							disabled={!isVoteable} aria-disabled={!isVoteable} />
						<span>{isChecked ? 'Selected' : 'Vote'}</span>
					</label>
				</div>
			</div>
		</div >
	)
}