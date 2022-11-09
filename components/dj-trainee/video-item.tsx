type VideoItemProps = {
	title: string
	src?: string
}

export function VideoItem({ title, src }: VideoItemProps) {

	return (
		<div>
			<h2 className="text-4xl text-white mb-2">{title}</h2>
			{src &&
				<iframe
					src={
						src.includes('facebook') ?
							`https://www.facebook.com/plugins/video.php?&href=${src}&show_text=false&t=0`
							:
							`https://www.youtube.com/embed/${src}`
					}
					allowFullScreen allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
					className="aspect-video w-full"
				/>
			}

		</div>
	)
}