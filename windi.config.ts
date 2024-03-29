import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'

export default defineConfig({
	theme: {
		extend: {
			colors: {
				primary: '#569429',
				secondary: '#D8CEAE',
				'primary-dark': '#2E5115',
				neutral: {
					...colors.neutral as Record<number, string>,
					600: '#646464',
					700: '#363636',
					800: '#262626',
					900: '#191919'
				},
			},
			fontFamily: {
				primary: ['var(--font-primary)'],
				secondary: ['var(--font-secondary)'],
				next: ['var(--font-next)'],
			},
			boxShadow: {
				progress: 'inset 0 -4px 8px 0 rgba(0, 0, 0, 0.6)',
				volume: 'rgba(0, 0, 0, 0.15) 0px 0px 0px 4px',
			}
		}
	},
	plugins: [
		require('windicss/plugin/aspect-ratio'),
		require('windicss/plugin/line-clamp'),
	],
	extract: {
		include: ['**/*.{jsx,tsx,css}'],
		exclude: ['node_modules', '.git', '.next'],
	},
})
