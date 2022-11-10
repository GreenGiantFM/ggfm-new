import Link from 'next/link'
import Image from 'next/future/image'

type PostProps = {
	link: string
	title: string
	excerpt: string
	image: string
	metadata: React.ReactNode
}

export function Post({ link, title, excerpt, image, metadata }: PostProps) {
	return (
		<Link href={link}>
			<a className="grid gap-y-2 sm:flex sm:space-x-4 justify-between bg-white text-black p-4 rounded-md sm:h-[166px]">
				<div className="flex flex-col flex-1 overflow-hidden">
					<h1 className="text-xl md:text-3xl mb-2 truncate">{title}</h1>
					<div className="flex-1">
						<p className="text-sm mb-1 line-clamp-3">{excerpt}</p>
					</div>
					{metadata}
				</div>
				<div className="w-auto h-60 sm:h-auto sm:w-[150px] md:(w-[200px] h-[134px]) -order-1 sm:order-none">
					<Image src={image} alt={`Image of ${title}`} width={200} height={134} className="w-full h-full object-cover object-center sm:object-top" />
				</div>
			</a>
		</Link>
	)
}

export function SkeletonPost() {
	return (
		<div className="flex justify-between space-x-4 bg-white text-black p-4 rounded-md">
			<div className="flex-1 children:bg-gray-300 animate-pulse space-y-4">
				<div className="w-full h-6" />
				<div className="w-3/4 h-4" />
				<div className="w-1/2 h-4" />
				<div className="w-3/4 h-4" />
			</div>
			<div className="relative w-[100px] h-[100px] sm:w-[150px] md:(w-[200px] h-[134px]) bg-gray-300 animate-pulse" />
		</div>
	)
}