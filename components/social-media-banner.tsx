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

export default function SocialMediaBanner() {
	return (
		<section className="grid place-items-center bg-white text-neutral-900 py-2 sm:py-0">
			<div>
				<h1 className="text-4xl sm:text-6xl text-center">Keep it locked with us!</h1>
				<div
					className="text-primary flex justify-center space-x-6 sm:space-x-10 mt-4 sm:mt-6 text-3xl sm:text-5xl">
					<a href={URLs.twitter}><FontAwesomeIcon icon={faTwitter} /></a>
					<a href={URLs.facebook}><FontAwesomeIcon icon={faFacebookF} /></a>
					<a href={URLs.youtube}><FontAwesomeIcon icon={faYoutube} /></a>
					<a href={URLs.spotify}><FontAwesomeIcon icon={faSpotify} /></a>
					<a href={URLs.instagram}><FontAwesomeIcon icon={faInstagram} /></a>
					<a href={URLs.linkedin}><FontAwesomeIcon icon={faLinkedinIn} /></a>
				</div>
			</div>
		</section>
	)
}
