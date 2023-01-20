# MWRA Data Scrape and Vis

Site available at https://solenoid.github.io/mwra-vis/

## Getting Started

TODO figure out what's the minimum needed here.

This work folded into the [demo](https://github.com/solenoid/demo) repo which is where it is carried foward.

## Initial Bootstrap

Still need to figure out how to deal with `data-tmp/scrape.js` for the longer term.

```zsh
npm config --location=project set save-prefix= # TODO consider if global is better
git init
npm init # answer and edit package.json to preference
npm install --save next react react-dom # next and react
npm install --save-dev prettier # prettier at known version
npm install --save-dev typescript @types/react @types/node # typescript
npm install --save-dev eslint eslint-config-next eslint-config-prettier # eslint
npm install --save @emotion/react@^11 @emotion/styled@^11 # chakra ui
mkdir -p src/pages
touch src/pages/index.tsx # and put in contents from guide
touch .prettierrc # and put in preference for prettier config
touch .eslintrc.json # and put in "next" and "prettier" for extends
touch .gitignore # and put in common folders / files
git add . # stage all of it
git commit --message "Manual Setup for nextjs app"
```

## Latest Data

```zsh
npm run scrape
git add public/data/
git commit -m "latest data"
git push
```

## Deploying

```zsh
git stash # if outstanding changes
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
```
