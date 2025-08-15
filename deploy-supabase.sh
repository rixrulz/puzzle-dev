#!/bin/bash

echo "🚀 Rion's Puzzle - Supabase Deployment Script"
echo "=============================================="
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found!"
    echo "Please run this script from the rions-puzzle directory"
    exit 1
fi

echo "✅ Found game files"
echo ""

echo "📋 DEPLOYMENT STEPS:"
echo "===================="
echo ""
echo "1. 🌐 Go to: https://supabase.com"
echo "2. 🔑 Sign up/Login with GitHub"
echo "3. ➕ Click 'New Project'"
echo "4. 📝 Project Name: rions-puzzle"
echo "5. 🔒 Create strong database password"
echo "6. 🌍 Choose region closest to you"
echo "7. ⏳ Wait for setup (2-3 minutes)"
echo ""
echo "8. 🗄️ Go to 'SQL Editor' and run the SQL from supabase-deploy-now.md"
echo "9. 🔐 Go to 'Authentication' and enable providers"
echo "10. 📁 Go to 'Storage' and create 'game-files' bucket (public)"
echo "11. 📤 Upload your game files to the bucket"
echo "12. ⚙️ Go to 'Settings' > 'API' and copy your keys"
echo "13. 🔧 Update index.html with your Supabase URL and key"
echo ""
echo "🎯 Your game will be live at:"
echo "https://your-project-ref.supabase.co/storage/v1/object/public/game-files/index.html"
echo ""

echo "📚 Need help? Check: supabase-deploy-now.md"
echo ""

# Check if Supabase CLI is available
if command -v supabase &> /dev/null; then
    echo "✅ Supabase CLI detected"
    echo "You can also use: supabase login && supabase link"
else
    echo "💡 Tip: Install Supabase CLI for advanced deployment:"
    echo "npm install -g supabase"
fi

echo ""
echo "🚀 Ready to deploy to Supabase!"
echo "Follow the steps above and your game will be live in minutes!"
