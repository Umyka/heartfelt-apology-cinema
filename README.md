
# Romantic Sorry Website 💕

A heartfelt, cinematic apology website with music, slideshow, and visit tracking.

## Features
- **Slideshow**: Smooth transitions between apology photos and couple photos
- **Music Integration**: Hindi apology song transitions to romantic song
- **Letter Section**: Beautiful scroll-style love letter
- **Falling Petals**: Dreamy background animation
- **Visit Tracking**: Supabase integration to track when he visits
- **Responsive Design**: Works perfectly on mobile and desktop

## Setup Instructions

### 1. Replace Placeholder Content
Update the following in `src/pages/Index.tsx`:

#### Image URLs (replace with your Cloudinary URLs):
```javascript
const apologyPhotos = [
  'YOUR_CLOUDINARY_APOLOGY_PHOTO_1_URL',
  'YOUR_CLOUDINARY_APOLOGY_PHOTO_2_URL',
  'YOUR_CLOUDINARY_APOLOGY_PHOTO_3_URL',
  'YOUR_CLOUDINARY_APOLOGY_PHOTO_4_URL',
  'YOUR_CLOUDINARY_APOLOGY_PHOTO_5_URL'
];

const couplePhotos = [
  'YOUR_CLOUDINARY_COUPLE_PHOTO_1_URL',
  'YOUR_CLOUDINARY_COUPLE_PHOTO_2_URL',
  'YOUR_CLOUDINARY_COUPLE_PHOTO_3_URL',
  'YOUR_CLOUDINARY_COUPLE_PHOTO_4_URL',
  'YOUR_CLOUDINARY_COUPLE_PHOTO_5_URL'
];
```

#### Music URLs:
```javascript
// Replace these in the audio elements:
YOUR_HINDI_APOLOGY_SONG_URL.mp3
YOUR_ROMANTIC_SONG_URL.mp3
```

#### Letter Content:
Customize the letter text in the letter section with your personal message.

### 2. Supabase Setup

#### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your Project URL and API Key

#### Step 2: Create Visits Table
Run this SQL in your Supabase SQL editor:

```sql
-- Create visits table
CREATE TABLE visits (
  id BIGSERIAL PRIMARY KEY,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  page TEXT,
  user_agent TEXT,
  referrer TEXT,
  screen_resolution TEXT,
  viewport_size TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone
CREATE POLICY "Allow public inserts" ON visits
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow you to read all visits
CREATE POLICY "Allow authenticated read" ON visits
  FOR SELECT
  TO authenticated
  USING (true);
```

#### Step 3: Update Supabase Credentials
Replace in `src/pages/Index.tsx`:
```javascript
const supabaseUrl = 'YOUR_ACTUAL_SUPABASE_URL';
const supabaseKey = 'YOUR_ACTUAL_SUPABASE_ANON_KEY';
```

### 3. Deployment Options

#### Option A: Netlify
1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to [netlify.com/drop](https://netlify.com/drop)
3. Your site will be live instantly!

#### Option B: GitHub Pages
1. Push code to GitHub repository
2. Go to repository Settings > Pages
3. Select source branch and folder
4. Your site will be available at `username.github.io/repository-name`

#### Option C: Vercel
1. Connect your GitHub repository to [vercel.com](https://vercel.com)
2. Deploy automatically with each push

### 4. Monitoring Visits

To see when he visits the site:
1. Go to your Supabase dashboard
2. Navigate to Table Editor > visits
3. You'll see all visits with timestamps and details

You can also create a simple dashboard by adding this query in your Supabase SQL editor:
```sql
SELECT 
  DATE(timestamp) as visit_date,
  COUNT(*) as total_visits,
  timestamp
FROM visits 
GROUP BY DATE(timestamp), timestamp
ORDER BY timestamp DESC;
```

## Customization Tips

### Colors
The current theme uses soft pink and cream colors. You can adjust these in the Tailwind classes:
- `bg-pink-50`, `bg-rose-50` - Background gradients
- `text-pink-600`, `text-pink-700` - Text colors
- `bg-pink-500` - Button colors

### Timing
- Slideshow timing: Change the `4000` in the setInterval (currently 4 seconds per slide)
- Section transitions: Adjust when photos transition to letter section

### Animations
- Falling petals: Adjust count in `[...Array(20)]`
- Animation speed: Modify `animationDuration` values

## Song Recommendations
- **Hindi Apology Songs**: "Maafi" by Krsna, "Sorry" by Justin Bieber (Hindi version)
- **Romantic Songs**: Whatever his favorite is!

## Support
The website is designed to be mobile-friendly and will work across all devices. The emotional impact is enhanced by the timing, music, and visual storytelling.

Good luck! I hope this helps bring you both back together. 💕
</tml>

Let me also update the HTML title to be more romantic:

<lov-write file_path="index.html">
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>I'm Sorry My Love 💕 | A Heartfelt Apology</title>
    <meta name="description" content="A heartfelt apology website with music, memories, and love" />
    <meta name="author" content="Lovable" />

    <meta property="og:title" content="I'm Sorry My Love 💕" />
    <meta property="og:description" content="A heartfelt apology website with music, memories, and love" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@lovable_dev" />
    <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
