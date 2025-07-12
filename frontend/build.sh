#!/bin/bash

# Build script for University Event Announcement Board Frontend

echo "🚀 Building University Event Announcement Board Frontend..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

echo "✅ Build completed successfully!"
echo "📁 Build files are in the 'build' directory"
echo "🌐 Ready for deployment!" 