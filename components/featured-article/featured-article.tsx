import { BorderedLink } from '@components/bordered-button'
import Image from 'next/future/image'

type FeaturedArticleProps = {
	category: string
	title: string
	excerpt: string
	image: string
	url: string
}

export function FeaturedArticle({ category, title, excerpt, image, url }: FeaturedArticleProps) {
	return (
		<article>
			<h2>{category}</h2>
			<figure className="relative aspect-video shadow-xl">
				<Image src={image} alt={title} className="w-full h-auto object-top object-cover" fill priority={true} />
			</figure>
			<h3>{title}</h3>
			<p>{excerpt}</p>
			<BorderedLink href={url} className="w-[fit-content] md:w-auto mt-2 md:mt-4 hover:(bg-white text-primary font-bold)">{category}</BorderedLink>
		</article>
	)
}