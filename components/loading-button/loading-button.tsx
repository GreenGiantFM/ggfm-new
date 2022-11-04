import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'

type LoadingButtonProps = {
	isLoading: boolean
	children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
	function LoadingButton({ className, isLoading, disabled, children, ...props }, ref) {
		const style = 'relative' + (isLoading ? ' !text-transparent' : '') + (className ? ' ' + className : '')

		return (
			<button className={style} disabled={disabled || isLoading} {...props} ref={ref}>
				{isLoading &&
					<div className="loading" />
				}
				{children}
			</button>
		)
	}
)
