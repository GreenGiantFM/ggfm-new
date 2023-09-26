import { create } from 'zustand'

type PlayerStore = {
	playerNumber: number
	volume: number
	setPlayerNumber: (playerNumber: number) => void
	setVolume: (volume: number) => void
}

export const usePlayerStore = create<PlayerStore>(set => ({
	playerNumber: -1,
	volume: 1,
	setPlayerNumber: (playerNumber: number) => set({ playerNumber }),
	setVolume: (volume: number) => set({ volume })
}))
