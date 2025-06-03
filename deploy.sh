#!/bin/bash

echo "🚀 Starting deployment process..."

# Stage all changes
git add .

# Commit with timestamp
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
git commit -m "Deploy to GitHub Pages - $TIMESTAMP"

# Push to main branch
git push origin main

echo "✅ Code pushed to GitHub"

# Build and deploy to GitHub Pages
echo "📦 Building and deploying to GitHub Pages..."
npm run deploy

echo "✨ Deployment complete!"
echo "🌐 Your site will be available at: https://mathewmoslow.github.io/pregnancylms_2"
echo "⏱️  Note: It may take a few minutes for changes to appear"
