#!/bin/bash

echo "🦕 Starting Rion's Puzzle Game! 🦖"
echo "=================================="
echo ""

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "🚀 Starting Python HTTP server..."
    echo "📱 Open your browser and go to: http://localhost:8000"
    echo "🔄 Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "🚀 Starting Python HTTP server..."
    echo "📱 Open your browser and go to: http://localhost:8000"
    echo "🔄 Press Ctrl+C to stop the server"
    echo ""
    python -m http.server 8000
else
    echo "❌ Python not found. Opening game directly in browser..."
    echo "📱 If the game doesn't work properly, please install Python or use a local server."
    echo ""
    
    # Try to open the game directly
    if command -v open &> /dev/null; then
        open index.html
    elif command -v xdg-open &> /dev/null; then
        xdg-open index.html
    else
        echo "🌐 Please open index.html in your web browser manually."
    fi
fi
