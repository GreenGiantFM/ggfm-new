type Pool = {
	name: string
	description: string
	image: string
	alt: string
}

export const POOLS: readonly Pool[] = [
	{
		name: 'Audio',
		description: 'We are the sound engineers of DLSU Radio: Green Giant FM. Our operations mainly\
		consist of handling tracks, producing commercials, and mixing audio. As producers\
		of DLSU Live! and DLSU Live! Sound, we bring exposure to the local music scene\
		along with some nice crisp audio.',
		image: '/images/pools/audio.png',
		alt: 'Image of speakers',
	},
	{
		name: 'Digital Communications',
		description: '-insert dgc description here-',
		image: '/images/pools/dgc.png',
		alt: 'Image of speaker phone',
	},
	{
		name: 'Documentations and Logistics',
		description: 'We serve as the backbone of DLSU Radio: Green Giant FM. With the Documentations subpool,\
		we make sure that the necessary requirements for the Station&apos;s events are processed on time.\
		Meanwhile, the Logistics subpool acts as the office managers, ensuring the efficiency of the Station.',
		image: '/images/pools/d-and-l.png',
		alt: 'Image of pen and paper',
	},
	{
		name: 'Public Relations',
		description: 'The Public Relations Pool is home to the executives in charge of collaborating with clients,\
		both inside and outside De La Salle University, in order to promote and build up with their events.\
		From promoting various events on air to providing radio talents for different events, we ensure that our\
		services are what our clients want and more.',
		image: '/images/pools/pr.png',
		alt: 'Image of two people talking to each other',
	},
	{
		name: 'Publicity and Productions',
		description: 'Publicity and Productions pool is responsible for the visual identity of the organization.\
		The members produce creative outputs through graphic design, photography, and videography.\
		They also make up the press team, who provide photo and video coverage for events inside and outside De La Salle University.',
		image: '/images/pools/p-and-p.png',
		alt: 'Image of a camera',
	},
	{
		name: 'Radio Talent',
		description: 'The Radio Talent Pool consists of the voices and faces of DLSU Radio: Green Giant FM.\
		The DJs control the music you listen to and talk about an endlessly colorful variety of\
		topics that you didn&apos;t think you needed to hear. But, the Radio Talent pool doesn\'t\
		only work their magic on-air, but we also bring out our personality and wit in different hosting events\
		inside and outside of De La Salle University.',
		image: '/images/pools/rt.png',
		alt: 'Image of microphone',
	},
	{
		name: 'Web Management',
		description: 'The Web Management Pool is in charge of maintaining and handling the website of DLSU Radio: Green Giant FM.\
		We make sure that the music we play live is catered to the audience outside De La Salle University,\
		while providing content such as articles, events, and more information regarding our radio station.',
		image: '/images/pools/web.png',
		alt: 'Image of a URL box containg the text \'https://\'',
	}
] as const