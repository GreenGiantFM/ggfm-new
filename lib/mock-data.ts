// Mock data for DJ Hunt functionality
import { DjTrainees } from '@directus-collections';

export const mockDjTrainees: Array<DjTrainees> = [
  {
    id: 1,
    nickname: "Soundwave",
    name: "Alex Johnson",
    caption: "Bringing you the hottest beats and smoothest vibes. <br/>Music is my passion, and I can't wait to share it with you!",
    image: "mock-trainee-1.jpg",
    segue: "Nice transition audio here",
    stinger: "DJ Soundwave stinger",
    videoshoot: "Video content here",
    voiceover: "Professional voiceover sample",
    date_created: "2024-01-15T10:00:00Z",
    date_updated: "2024-01-15T10:00:00Z",
    sort: 1,
    status: "published",
    user_created: "admin",
    user_updated: "admin"
  },
  {
    id: 2,
    nickname: "Rhythm",
    name: "Sarah Martinez",
    caption: "From hip-hop to electronic, I bring energy to every track. <br/>Let's turn up the volume and make some memories!",
    image: "mock-trainee-2.jpg",
    segue: "Smooth rhythm transition",
    stinger: "DJ Rhythm stinger",
    videoshoot: "Video showcase",
    voiceover: "Dynamic voiceover sample",
    date_created: "2024-01-16T10:00:00Z",
    date_updated: "2024-01-16T10:00:00Z",
    sort: 2,
    status: "published",
    user_created: "admin",
    user_updated: "admin"
  },
  {
    id: 3,
    nickname: "Vibe",
    name: "Marcus Thompson",
    caption: "I create the perfect atmosphere for any moment. <br/>Whether you need energy or chill vibes, I've got you covered!",
    image: "mock-trainee-3.jpg",
    segue: "Chill vibe transition",
    stinger: "DJ Vibe signature sound",
    videoshoot: "Relaxed video content",
    voiceover: "Smooth voiceover delivery",
    date_created: "2024-01-17T10:00:00Z",
    date_updated: "2024-01-17T10:00:00Z",
    sort: 3,
    status: "published",
    user_created: "admin",
    user_updated: "admin"
  },
  {
    id: 4,
    nickname: "Echo",
    name: "Jessica Chen",
    caption: "My mixes echo through the airwaves, creating unforgettable moments. <br/>Join me on this musical journey!",
    image: "mock-trainee-4.jpg",
    segue: "Echo effect transition",
    stinger: "DJ Echo signature",
    videoshoot: "Creative video content",
    voiceover: "Clear and engaging voice",
    date_created: "2024-01-18T10:00:00Z",
    date_updated: "2024-01-18T10:00:00Z",
    sort: 4,
    status: "published",
    user_created: "admin",
    user_updated: "admin"
  }
];

// Mock data for other collections used in home page
export const mockRadioTalents = [
  {
    id: 1,
    name: "John Smith",
    nickname: "Johnny Beats",
    image: "mock-radio-talent-1.jpg",
    writeup: "Veteran DJ with 10 years of experience",
    status: "published"
  },
  {
    id: 2,
    name: "Sarah Williams",
    nickname: "Sarah Vibes",
    image: "mock-radio-talent-2.jpg",
    writeup: "Bringing fresh energy to the airwaves",
    status: "published"
  }
];

export const mockEvents = [
  {
    id: 1,
    title: "Summer Music Festival",
    body: "Join us for an amazing summer music festival featuring local and international artists. Experience great music, food, and entertainment for the whole family.",
    image: "mock-event-1.jpg",
    location: "Central Park",
    start_date: "2024-07-15T18:00:00Z",
    end_date: "2024-07-15T23:59:00Z",
    posting_date: "2024-06-01T10:00:00Z",
    status: "published",
    tags: ["music", "festival", "summer"]
  }
];

export const mockBlogs = [
  {
    id: 1,
    title: "The Evolution of Radio Broadcasting",
    body: "Radio has come a long way since its inception. From AM to FM to digital, we explore how radio broadcasting has evolved and what the future holds for this timeless medium.",
    image: "mock-blog-1.jpg",
    posting_date: "2024-08-01T10:00:00Z",
    status: "published",
    author: "Green Giant FM Team",
    tags: ["radio", "technology", "history"],
    youtube_link: null
  }
];

export const mockMisc = {
  id: 1,
  playlist_url: "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M",
  hero_description: "Green Giant FM - Your Voice, Your Music",
  mission: "To connect communities through music and entertainment",
  vision: "To be the leading radio station in our region"
};

export const mockAow = [
  {
    id: 1,
    image: "mock-aow-1.jpg",
    status: "published",
    date_created: "2024-08-01T10:00:00Z",
    sort: 1
  }
];

export const mockShows = [
  {
    id: 1,
    name: "Morning Drive",
    image: "mock-show-1.jpg",
    status: "published"
  },
  {
    id: 2,
    name: "Afternoon Mix",
    image: "mock-show-2.jpg",
    status: "published"
  }
];

export const mockDates = {
  id: 1,
  name: "DJ Hunt",
  start: "2024-01-01T00:00:00Z",
  end: "2024-12-31T23:59:59Z",
  date_created: "2024-01-01T00:00:00Z",
  date_updated: "2024-01-01T00:00:00Z",
  user_created: "admin",
  user_updated: "admin"
};

// Mock vote counts for polls
export const mockVoteCounts = [
  { candidate: 1, count: 15 },
  { candidate: 2, count: 23 },
  { candidate: 3, count: 8 },
  { candidate: 4, count: 12 }
];

// In-memory vote storage for development
export const mockVotes: Array<{ candidate: number; email: string; id: number }> = [];
let nextVoteId = 1;

export function addMockVote(candidate: number, email: string) {
  mockVotes.push({
    id: nextVoteId++,
    candidate,
    email
  });
}

export function hasUserVoted(email: string): boolean {
  return mockVotes.some(vote => vote.email === email);
}
