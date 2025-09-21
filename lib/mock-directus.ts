// Mock data service to replace Directus calls for development
import { 
  mockDjTrainees, 
  mockDates, 
  mockVoteCounts, 
  addMockVote, 
  hasUserVoted,
  mockRadioTalents,
  mockEvents,
  mockBlogs,
  mockMisc,
  mockAow,
  mockShows
} from './mock-data';

const USE_MOCK_DATA = process.env.NODE_ENV === 'development' && 
  process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

// Mock implementations of Directus operations
export const mockDirectusClient = {
  async readItems(collection: string, options?: any) {
    console.log(`[MOCK] Reading items from ${collection}`, options);
    
    switch (collection) {
      case 'dj_trainees':
        return mockDjTrainees.filter(trainee => 
          !options?.filter?.status || trainee.status === options.filter.status._eq
        );
      
      case 'dates':
        if (options?.filter?.name?._eq === 'DJ Hunt') {
          return [mockDates];
        }
        return [mockDates];
      
      case 'radio_talents':
        return mockRadioTalents.filter(talent =>
          !options?.filter?.status || talent.status === options.filter.status._eq
        );
      
      case 'aow':
        return mockAow.filter(item =>
          !options?.filter?.status || item.status === options.filter.status._eq
        );
      
      case 'shows':
        return mockShows.filter(show =>
          !options?.filter?.status || show.status === options.filter.status._eq
        );
      
      default:
        console.warn(`[MOCK] Unknown collection: ${collection}`);
        return [];
    }
  },

  async readSingleton(collection: string, options?: any) {
    console.log(`[MOCK] Reading singleton from ${collection}`, options);
    
    switch (collection) {
      case 'misc':
        return mockMisc;
      
      default:
        console.warn(`[MOCK] Unknown singleton collection: ${collection}`);
        return {};
    }
  },

  async aggregate(collection: string, options: any) {
    console.log(`[MOCK] Aggregating data from ${collection}`, options);
    
    if (collection === 'hunt_votes') {
      if (options.groupBy?.includes('candidate')) {
        return mockVoteCounts;
      }
      
      if (options.query?.filter?.email?._eq) {
        const email = options.query.filter.email._eq;
        const count = hasUserVoted(email) ? 1 : 0;
        return [{ count }];
      }
    }
    
    return [];
  },

  async createItems(collection: string, items: any[]) {
    console.log(`[MOCK] Creating items in ${collection}`, items);
    
    if (collection === 'hunt_votes') {
      items.forEach(item => {
        addMockVote(item.candidate, item.email);
      });
      return items;
    }
    
    return items;
  }
};

export { USE_MOCK_DATA };
