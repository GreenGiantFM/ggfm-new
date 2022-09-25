import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import URLs from '@lib/urls'
import {
	faFacebookF,
	faInstagram,
	faTwitter,
	faYoutube,
	faLinkedinIn,
	faSpotify
} from '@fortawesome/free-brands-svg-icons'
import { EnvelopeIcon } from '@heroicons/react/24/solid'

export default function SocialMediaBanner() {
	return (
		<section className="grid place-items-center bg-white text-neutral-900 !py-6">
			<div>
				<h1 className="!text-4xl !sm:text-6xl text-center">Keep it locked with us!</h1>
				<div
					className="text-primary flex justify-center space-x-5 sm:space-x-10 mt-4 sm:mt-6 text-3xl sm:text-5xl">
					<a href={URLs.twitter} aria-label="Twitter profile link"><FontAwesomeIcon icon={faTwitter} /></a>
					<a href={URLs.facebook} aria-label="Facebook profile link"><FontAwesomeIcon icon={faFacebookF} /></a>
					<a href={URLs.youtube} aria-label="Youtube channel link"><FontAwesomeIcon icon={faYoutube} /></a>
					<a href={URLs.spotify} aria-label="Spotify account link"><FontAwesomeIcon icon={faSpotify} /></a>
					<a href={URLs.instagram} aria-label="Instagram profile link"><FontAwesomeIcon icon={faInstagram} /></a>
					<a href={URLs.linkedin} aria-label="LinkedIn profile link"><FontAwesomeIcon icon={faLinkedinIn} /></a>
					<a href="mailto:publicrelations.ggfm@gmail.com" aria-label="Public relations email address link">
						<EnvelopeIcon className="w-9 sm:w-13 aspect-square relative sm:bottom-0.5" />
					</a>
				</div>
			</div>
		</section>
	)
}
