import { BorderedLink } from '@components/bordered-button'

export default function NotFoundPage() {
	return (
		<div className="rounded-lg bg-white text-gray-900 place-self-center p-8">
			<h1 className="text-4xl mb-2">Uh-oh. Page not found.</h1>
			<p>The link you clicked may be broken or the page may have been removed.</p>
			<BorderedLink href="/" className="mt-8 border-gray-900">
				Go home
			</BorderedLink>
		</div>
	)
}
