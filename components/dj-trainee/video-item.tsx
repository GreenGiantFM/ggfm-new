import { HTMLAttributes } from 'react'

type VideoItemProps = {
	title: string
	src?: string
	aspectRatio?: string
} & HTMLAttributes<HTMLDivElement>

export function VideoItem({ title, src, aspectRatio, ...props }: VideoItemProps) {

	return (
		<div {...props}>
			<h2 className="text-4xl text-center text-white mb-2">{title}</h2>
			{src ?
				<iframe
					src={
						src.includes('facebook') ?
							`https://www.facebook.com/plugins/video.php?&href=${src}&show_text=false&t=0`
							:
							`https://www.youtube.com/embed/${src}`
					}
					allowFullScreen allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
					className="w-full"
					style={{ aspectRatio: aspectRatio ?? '16/9' }}
				/>
				:
				<div className="bg-transparent w-full" style={{ aspectRatio: aspectRatio ?? '16/9' }} />
			}
		</div>
	)
}