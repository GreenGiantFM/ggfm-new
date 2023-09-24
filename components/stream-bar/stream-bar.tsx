'use client'

import { PauseIcon, PlayIcon } from '@heroicons/react/20/solid'
import { useEffect, useRef, useState } from 'react'
import { TimeStamp } from './timestamp'
import { VolumeSlider } from './volume-slider'

export function StreamBar() {
	const [isPlaying, setIsPlaying] = useState(false)
	const audio = useRef<HTMLAudioElement>(null)
	const hasLoaded = useRef(false)

	useEffect(() => {
		if (isPlaying) {
			audio.current?.play()
		} else {
			audio.current?.pause()
		}
	}, [isPlaying])

	useEffect(() => { // sets hadLoaded to true when audio loads
		const onLoad = () => hasLoaded.current = true
		let elem = audio.current
		elem?.addEventListener('loadeddata', onLoad)
		return () => elem?.removeEventListener('loadeddata', onLoad)
	}, [])

	return (
		<section className="h-12 bg-white sticky bottom-0 bg-opacity-80 backdrop-filter backdrop-blur-md flex items-center stream-bar" aria-label="miniplayer">
			<div className="container px-4 mx-auto flex items-center justify-between">
				<div className="flex items-center gap-2">
					<p className="font-primary text-2xl">Live Stream</p>
					<button title={isPlaying ? 'Pause stream' : 'Play stream'} onClick={() => setIsPlaying(p => !p)}>
						{isPlaying ? <PauseIcon className="h-7" /> : <PlayIcon className="h-7" />}
					</button>
					<TimeStamp isPlaying={isPlaying} hasLoaded={hasLoaded} className="min-w-20" />
				</div>
				<VolumeSlider audio={audio} className="gap-x-1 hidden sm:flex " />
				<audio src="https://stream.greengiantfm.com/stream" ref={audio}></audio>
			</div>
		</section >
	)
}