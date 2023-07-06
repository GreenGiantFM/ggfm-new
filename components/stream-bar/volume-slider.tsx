import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid'
import * as Slider from '@radix-ui/react-slider'
import { HTMLAttributes, RefObject, useEffect, useState } from 'react'

type VolumeSliderProps = {
	audio: RefObject<HTMLAudioElement>
} & HTMLAttributes<HTMLSpanElement>

export function VolumeSlider({ audio, className, ...props }: VolumeSliderProps) {
	const [volume, setVolume] = useState(1)
	const [prevVol, setPrevVol] = useState(0)
	const isMuted = volume == 0

	function handleMuteClick() {
		if (isMuted) {
			setVolume(Math.max(prevVol, 0.01))
			return
		}

		setPrevVol(volume)
		setVolume(0)
	}

	useEffect(() => {
		if (audio.current) audio.current.volume = volume
		if (volume != 0) setPrevVol(0)
	}, [volume, audio])

	return (
		<span className={`flex items-center ${className ?? ''}`} {...props}>
			<button title={isMuted ? 'Unmute sound' : 'Mute sound'} onClick={handleMuteClick}>
				{isMuted ? <SpeakerXMarkIcon className='h-7' /> : <SpeakerWaveIcon className='h-7' />}
			</button>
			<Slider.Root className="volume w-40 h-full" value={[volume]} max={1} step={0.01} onValueChange={a => setVolume(a[0])}>
				<Slider.Track className="volume-track">
					<Slider.Range className="volume-range" />
				</Slider.Track>
				<Slider.Thumb className="volume-thumb" aria-label="Volume" />
			</Slider.Root>
		</span>
	)
}