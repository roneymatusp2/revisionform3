@echo off
echo Deploying to GitHub Pages...

echo Installing gh-pages package...
npm install --save-dev gh-pages

echo Building the application...
npm run build

echo Deploying to GitHub Pages...
npm run deploy

echo Deployment complete!
echo Visit your site at: https://roneymatusp2.github.io/arevisionrevision
