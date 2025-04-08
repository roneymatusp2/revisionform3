@echo off
echo Pushing changes to GitHub...

git add .
git commit -m "Fix Netlify build configuration to ignore ESLint warnings"
git push origin main

echo Done! Now redeploy on Netlify.
