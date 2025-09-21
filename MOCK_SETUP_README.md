   # Running DJ Hunt Locally with Mock Data

This setup allows you to run the DJ Hunt feature locally without needing to connect to the Directus CMS.

## Setup Instructions

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Use the development environment file**:
   The `.env.development.local` file is already configured with:
   - `NEXT_PUBLIC_USE_MOCK_DATA=true` - Enables mock data mode
   - `NEXT_PUBLIC_ASSETS_URL=/images/mock/` - Points to local mock images
   - Local server URLs instead of production URLs

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Access the DJ Hunt pages**:
   - Main voting page: http://localhost:3000/dj-hunt
   - Polls/results page: http://localhost:3000/dj-hunt/polls

## What's Included in Mock Mode

### Mock DJ Trainees:
- **DJ Soundwave** (Alex Johnson)
- **DJ Rhythm** (Sarah Martinez) 
- **DJ Vibe** (Marcus Thompson)
- **DJ Echo** (Jessica Chen)

### Mock Voting System:
- In-memory vote storage (resets when server restarts)
- Google OAuth integration still works for testing
- Vote validation (prevents duplicate voting)
- Live vote count updates

### Mock Images:
- Placeholder images are created in `/public/images/mock/`
- You can replace these with actual images if needed

## Features That Work:
- ✅ DJ trainee display
- ✅ Voting form functionality
- ✅ Vote counting and polls display
- ✅ Date-based voting window (configured for full year 2024)
- ✅ Google OAuth integration
- ✅ Duplicate vote prevention

## Note:
- Votes are stored in memory and will reset when you restart the development server
- Mock images are simple text files - replace with actual JPG/PNG files for better visual experience
- The voting window is currently set to be active for the entire year of 2024

## Switching Back to Production:
To use the real Directus CMS, either:
1. Delete the `.env.development.local` file, or
2. Change `NEXT_PUBLIC_USE_MOCK_DATA=false` in that file
