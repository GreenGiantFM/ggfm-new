import { DjTrainees } from '@directus-collections'
import Image from 'next/image'
import { HTMLAttributes, useState } from 'react'

type DJTraineeItemProps = {
	onMore: () => void
	onVote: () => void
	isVoteable: boolean
	id: DjTrainees['id']
} & Pick<DjTrainees, 'image' | 'nickname' | 'caption'> & Omit<HTMLAttributes<HTMLDivElement>, 'id'>

export function DJTraineeItem({ image, nickname, caption, id, onMore, onVote, isVoteable, className, ...props }: DJTraineeItemProps) {
	const [isChecked, setIsChecked] = useState(false)

	function onChange() {
		setIsChecked(!isChecked)
		onVote()
	}

	return (
		<div
			className={`bg-white rounded text-gray-900 flex` + (className ? ` ${className}` : '')}
			{...props}
		>
			<div className="w-24 aspect-square">
				<Image
					src={process.env.NEXT_PUBLIC_ASSETS_URL + image}
					alt={`Image of DJ ${nickname}`}
					width={200}
					height={200}
					className="object-cover w-full h-full rounded-l block"
					style={{ objectPosition: '0 -12px' }}
				/>
			</div>
			<div className="px-4 py-2 flex-1 space-y-4">
				<div>
					<h2 className="text-2xl">DJ {nickname}</h2>
					<div className="text-sm italic line-clamp-2 h-10" dangerouslySetInnerHTML={{ __html: caption }} />
				</div>
				<div className="flex space-x-4 children:(border-gray-500 border rounded px-4 w-full)">
					<label className={"btn focus:ring-1 cursor-pointer text-center " +
						(isChecked ? 'green' : 'white') +
						(isVoteable ? '' : ' !opacity-50 !cursor-not-allowed !hover:bg-white')}
					>
						<input type="checkbox" name="selection" className="hide" value={id} onChange={onChange}
							disabled={!isVoteable} aria-disabled={!isVoteable} />
						<span>{isChecked ? 'Selected' : 'Vote'}</span>
					</label>
					<button className="btn white focus:ring-1" onClick={onMore}>More...</button>
				</div>
			</div>
		</div>
	)
}
