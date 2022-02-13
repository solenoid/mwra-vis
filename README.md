# MWRA Data Scrape and Vis

## Getting Started

TODO figure out what's the minimum needed here.

## Initial Bootstrap

Still need to figure out how to deal with `data-tmp/scrape.js` for the longer term.

```
npm config --location=project set save-prefix=
git init
npm init # answer and edit package.json to preference
npm install --save next react react-dom
npm install --save-dev prettier
npm install --save-dev typescript @types/react @types/node
npm install --save-dev eslint eslint-config-next eslint-config-prettier
# add in scripts section to package.json
mkdir -p src/pages
touch src/pages/index.tsx # and put in contents from guide
touch .prettierrc # and put in preference for prettier config
touch .eslintrc.json # and put in "next" and "prettier" for extends
touch .gitignore # and put in common folders / files
git add . # stage all of it
git commit --message "Manual Setup for nextjs app"
```
