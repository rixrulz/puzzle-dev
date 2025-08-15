#!/bin/bash

echo "🚀 Deploying Rion's Dinosaur Puzzle to GitHub Pages!"
echo "=================================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please run 'git init' first."
    exit 1
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "📝 Setting up GitHub repository..."
    echo ""
    echo "Please follow these steps:"
    echo "1. Go to https://github.com/new"
    echo "2. Create a new repository named 'rions-puzzle'"
    echo "3. Make it PUBLIC (required for GitHub Pages)"
    echo "4. Don't initialize with README (we already have one)"
    echo "5. Copy the repository URL"
    echo ""
    read -p "Enter your GitHub repository URL: " repo_url
    
    if [ -n "$repo_url" ]; then
        git remote add origin "$repo_url"
        echo "✅ Remote origin added: $repo_url"
    else
        echo "❌ No URL provided. Exiting."
        exit 1
    fi
fi

echo "📤 Pushing code to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Code pushed successfully!"
    echo ""
    echo "🌐 Setting up GitHub Pages..."
    echo ""
    echo "Now follow these steps to enable GitHub Pages:"
    echo "1. Go to your repository on GitHub"
    echo "2. Click 'Settings' tab"
    echo "3. Scroll down to 'Pages' section"
    echo "4. Under 'Source', select 'Deploy from a branch'"
    echo "5. Select 'main' branch and '/ (root)' folder"
    echo "6. Click 'Save'"
    echo ""
    echo "🎉 Your game will be live at:"
    echo "https://yourusername.github.io/rions-puzzle/"
    echo ""
    echo "⏱️  It may take a few minutes for the first deployment."
    echo ""
    echo "🔗 You can also deploy to other platforms:"
    echo "- Netlify: Drag and drop this folder to netlify.com"
    echo "- Vercel: Connect your GitHub repo to vercel.com"
    echo "- Surge: Install surge.sh and run 'surge .'"
else
    echo "❌ Failed to push code. Please check your git setup."
    exit 1
fi
