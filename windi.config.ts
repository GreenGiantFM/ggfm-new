import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'

export default defineConfig({
	theme: {
		extend: {
			colors: {
				primary: '#569429',
				secondary: '#D8CEAE',
				neutral: {
					...colors.neutral as Record<number, string>,
					600: '#646464',
					700: '#363636',
					800: '#262626',
					900: '#191919'
				}
			},
			fontFamily: {
				primary: ['Kenyan Coffee', 'Oswald SemiBold', 'Verdana', 'sans-serif'],
				secondary: ['Raleway', 'Roboto', 'Verdana', 'sans-serif'],
			}
		}
	},
	extract: {
		include: ['**/*.{jsx,tsx,css}'],
		exclude: ['node_modules', '.git', '.next'],
	},
})
