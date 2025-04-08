@echo off
echo Pushing changes to GitHub...

git add .
git commit -m "Fix Netlify build for Windows - create cross-platform build script"
git push origin main

echo Done! Now redeploy on Netlify.
