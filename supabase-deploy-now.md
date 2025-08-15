# 🚀 DEPLOY TO SUPABASE NOW - Complete Guide

## 🌟 **Deploy Rion's Puzzle Game to Supabase Free Tier**

**Supabase** is perfect for this! You get hosting, database, authentication, and real-time features all in one place.

---

## 📋 **Step 1: Create Supabase Project**

### **Go to Supabase**
- Visit: [supabase.com](https://supabase.com)
- Click "Start your project"
- Sign up with GitHub (recommended)

### **Create New Project**
- Click "New Project"
- Choose your organization
- **Project Name**: `rions-puzzle`
- **Database Password**: Create a strong password (save this!)
- **Region**: Choose closest to you
- Click "Create new project"

### **Wait for Setup**
- Supabase will set up your project (2-3 minutes)
- You'll get your project URL and API keys

---

## 🗄️ **Step 2: Set Up Database Tables**

### **Go to SQL Editor**
- In your project dashboard, click "SQL Editor" (left sidebar)
- Click "New query"

### **Create Tables**
Copy and paste this SQL:

```sql
-- Users table for authentication
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE,
  username TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Game progress table
CREATE TABLE game_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  puzzle_level INTEGER,
  pieces_placed INTEGER,
  completion_time INTEGER,
  stars_earned INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leaderboard table
CREATE TABLE leaderboard (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  puzzle_level INTEGER,
  best_time INTEGER,
  total_stars INTEGER,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own data" ON users FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own progress" ON game_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON game_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view leaderboard" ON leaderboard FOR SELECT USING (true);
CREATE POLICY "Users can insert own scores" ON leaderboard FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### **Run the SQL**
- Click "Run" button
- You should see "Success" message

---

## 🔐 **Step 3: Set Up Authentication**

### **Go to Authentication**
- Click "Authentication" in left sidebar
- Click "Settings" tab

### **Configure Providers**
- **Enable Email**: Turn on "Enable email confirmations"
- **Enable GitHub**: Turn on "Enable GitHub OAuth"
- **Site URL**: Add your project URL (we'll get this later)

---

## 📁 **Step 4: Deploy Game Files**

### **Option A: Upload to Supabase Storage**
1. Go to "Storage" in left sidebar
2. Click "Create a new bucket"
3. **Name**: `game-files`
4. **Public bucket**: Check this box
5. Click "Create bucket"
6. Upload your game files:
   - `index.html`
   - `styles.css`
   - `game.js`
   - `sounds/` folder

### **Option B: Use Supabase CLI (Advanced)**
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref YOUR_PROJECT_REF

# Deploy
supabase db push
```

---

## 🔗 **Step 5: Get Your Project Details**

### **Go to Settings**
- Click "Settings" in left sidebar
- Click "API" tab

### **Copy These Values**
- **Project URL**: `https://your-project-ref.supabase.co`
- **Anon Key**: `your-anon-key-here`
- **Service Role Key**: `your-service-role-key-here`

---

## 🎮 **Step 6: Integrate Supabase with Your Game**

### **Update index.html**
Add this before closing `</body>` tag:

```html
<!-- Supabase Client -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
  // Initialize Supabase
  const supabaseUrl = 'YOUR_PROJECT_URL'
  const supabaseKey = 'YOUR_ANON_KEY'
  const supabase = supabase.createClient(supabaseUrl, supabaseKey)
</script>
```

### **Update game.js**
Add these functions:

```javascript
// Save progress to Supabase
async function saveProgress(level, piecesPlaced, time, stars) {
  const { data, error } = await supabase
    .from('game_progress')
    .insert([
      {
        puzzle_level: level,
        pieces_placed: piecesPlaced,
        completion_time: time,
        stars_earned: stars
      }
    ])
  
  if (error) console.error('Error saving progress:', error)
  else console.log('Progress saved to Supabase!')
}

// Get user progress
async function getUserProgress() {
  const { data, error } = await supabase
    .from('game_progress')
    .select('*')
    .order('completed_at', { ascending: false })
  
  if (error) console.error('Error getting progress:', error)
  else return data
}

// Update leaderboard
async function updateLeaderboard(level, time, stars) {
  const { data, error } = await supabase
    .from('leaderboard')
    .upsert([
      {
        puzzle_level: level,
        best_time: time,
        total_stars: stars
      }
    ])
  
  if (error) console.error('Error updating leaderboard:', error)
  else console.log('Leaderboard updated!')
}
```

---

## 🚀 **Step 7: Test Your Deployment**

### **Visit Your Game**
- Your game will be accessible via Supabase Storage
- URL format: `https://your-project-ref.supabase.co/storage/v1/object/public/game-files/index.html`

### **Test Features**
1. **Play the game** - drag and drop pieces
2. **Check console** for Supabase connection
3. **Test progress saving** when completing puzzles
4. **Verify authentication** works

---

## ✅ **What You Get with Supabase Free Tier:**

- ✅ **50,000 monthly active users**
- ✅ **500MB database**
- ✅ **2GB file storage**
- ✅ **50MB database backups**
- ✅ **Real-time subscriptions**
- ✅ **Authentication (Google, GitHub, etc.)**
- ✅ **Row Level Security**
- ✅ **Auto-generated APIs**
- ✅ **Static file hosting**

---

## 🎯 **Enhanced Game Features:**

- 👤 **User accounts** and progress saving
- 🏆 **Leaderboards** and achievements
- 💾 **Cloud save** across devices
- 🔄 **Multiplayer** puzzle challenges
- 📊 **Analytics** and game statistics
- 🌐 **Social features** and sharing

---

## 🚀 **Ready to Deploy?**

**Follow the steps above to deploy to Supabase now!**

Your game will be live with a powerful backend in under 10 minutes! 🎉

---

## 📞 **Need Help?**

- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Community**: [github.com/supabase/supabase](https://github.com/supabase/supabase)
- **Discord**: [discord.supabase.com](https://discord.supabase.com)

---

**🎮 Deploy to Supabase and get the best of both worlds - hosting AND backend!**
