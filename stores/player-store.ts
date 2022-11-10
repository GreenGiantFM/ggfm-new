import create from 'zustand'

type PlayerStore = {
	playerNumber: number
	setPlayerNumber: (playerNumber: number) => void
}

export const usePlayerStore = create<PlayerStore>(set => ({
	playerNumber: 0,
	setPlayerNumber: (playerNumber: number) => set({ playerNumber: playerNumber })
}))
