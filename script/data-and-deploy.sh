#!/bin/zsh

set -e

npm run scrape
git add public/data/
git commit -m "latest data"
git push
git switch gh-pages
git reset --hard origin/main
npm run build && npm run export
rm -rf docs
mv out docs
git add docs
git commit -m "Build for gh-pages"
git push --force-with-lease
git switch main
rm -rf docs
