type Pool = {
	name: string
	director: string
	description: string
	image: string
	alt: string
}

export const POOLS: readonly Pool[] = [
	{
		name: 'Audio',
		director: 'Raymond Cousart',
		description: 'We are the sound engineers of DLSU Radio: Green Giant FM. Our operations mainly\
		consist of handling tracks, producing commercials, and mixing audio. As producers\
		of DLSU Live! and DLSU Live! Sound, we bring exposure to the local music scene\
		along with some nice crisp audio.',
		image: '/images/pools/audio.png',
		alt: 'Image of speakers',
	},
	{
		name: 'Digital Communications',
		director: 'Matthew Llenos',
		description: 'The Digital Communications Pool is responsible for generating\
		creative content that is aimed to increase GGFM\'s social media engagement.\
		We ensure that the organization is able to connect with its target audience\
		across all social media platforms.',
		image: '/images/pools/dgc.png',
		alt: 'Image of speaker phone',
	},
	{
		name: 'Documentations and Logistics',
		director: 'Camille Oliva',
		description: 'We serve as the backbone of DLSU Radio: Green Giant FM. With the Documentations subpool,\
		we make sure that the necessary requirements for the Station\'s events are processed on time.\
		Meanwhile, the Logistics subpool acts as the office managers, ensuring the efficiency of the Station.',
		image: '/images/pools/d-and-l.png',
		alt: 'Image of pen and paper',
	},
	{
		name: 'Public Relations',
		director: 'Renee Garcia',
		description: 'The Public Relations Pool is home to the executives in charge of collaborating with clients,\
		both inside and outside De La Salle University, in order to promote and build up with their events.\
		From promoting various events on air to providing radio talents for different events, we ensure that our\
		services are what our clients want and more.',
		image: '/images/pools/pr.png',
		alt: 'Image of two people talking to each other',
	},
	{
		name: 'Publicity and Productions',
		director: 'Allyrianne Garcia',
		description: 'Publicity and Productions pool is responsible for the visual identity of the organization.\
		The members produce creative outputs through graphic design, photography, and videography.\
		They also make up the press team, who provide photo and video coverage for events inside and outside De La Salle University.',
		image: '/images/pools/p-and-p.png',
		alt: 'Image of a camera',
	},
	{
		name: 'Radio Talent',
		director: 'Samantha Sio',
		description: 'The Radio Talent Pool consists of the voices and faces of DLSU Radio: Green Giant FM.\
		The DJs control the music you listen to and talk about an endlessly colorful variety of\
		topics that you didn\'t think you needed to hear. But, the Radio Talent pool doesn\'t\
		only work their magic on-air, but we also bring out our personality and wit in different hosting events\
		inside and outside of De La Salle University.',
		image: '/images/pools/rt.png',
		alt: 'Image of microphone',
	},
	{
		name: 'Web Management',
		director: 'Jared Sy',
		description: 'The Web Management Pool is in charge of maintaining and handling the website of DLSU Radio: Green Giant FM.\
		We make sure that the music we play live is catered to the audience outside De La Salle University,\
		while providing content such as articles, events, and more information regarding our radio station.',
		image: '/images/pools/web.png',
		alt: 'Image of a URL box containg the text \'https://\'',
	}
] as const