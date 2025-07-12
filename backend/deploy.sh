#!/bin/bash

# Deployment script for University Event Announcement Board Backend

echo "🚀 Deploying University Event Announcement Board Backend..."

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

# Set environment variables
export FLASK_ENV=production
export FLASK_APP=app.py

echo "✅ Backend deployment completed!"
echo "🌐 Backend is ready to run on port 5000"
echo "💡 Run 'python app.py' to start the server" 