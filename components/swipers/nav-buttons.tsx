import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { ButtonHTMLAttributes, forwardRef } from 'react'

const style = `aspect-square absolute rounded-full bg-white text-neutral-900 grid
		place-items-center top-1/2 transform -translate-y-1/2 cursor-pointer z-10 disabled:(opacity-40 pointer-events-none)`

export const LeftButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
	function LeftButton({ className, ...props }, ref) {
		return (
			<button className={`${className ?? ''} ${style} left-2`} ref={ref} {...props}>
				<ChevronLeftIcon className="transform -translate-x-0.25" />
			</button>
		)
	}
)

export const RightButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
	function RightButton({ className, ...props }, ref) {
		return (
			<button className={`${className ?? ''} ${style} right-2`} ref={ref} {...props} >
				<ChevronRightIcon className="transform translate-x-0.25" />
			</button>
		)
	}
)