type DateTimeDisplayProps = {
	value: number
	type: string
}

export function DateTimeDisplay({ value, type }: DateTimeDisplayProps) {
	return (
		<div className="text-lg sm:text-2xl">
			<p className="font-next">{value}</p>
			<p>{type}</p>
		</div>
	)
}