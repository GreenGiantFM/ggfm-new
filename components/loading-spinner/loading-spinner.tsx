import { HTMLAttributes } from 'react'

export function LoadingSpinner({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	const cn = 'flex justify-center items-center' + (className ? ` ${className}` : '')

	return (
		<div className={cn}>
			<div className="animate-spin inline-block w-20 h-20 border-8 rounded-full"
				{...props}
				role="status"
				style={{
					borderColor: '#FFF #FFF transparent'
				}}
			>
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	)
}

