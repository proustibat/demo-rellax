#!/bin/bash
# See https://medium.com/@nthgergo/publishing-gh-pages-with-travis-ci-53a8270e87db
set -o errexit

#rm -rf dist
#mkdir dist

# config
#git config --global user.email "nobody@nobody.org"
#git config --global user.name "Travis CI"

# build (CHANGE THIS)
npm run build

# deploy
git checkout gh-pages
#cp dist/* ./*
#git commit -am "Deploy to Github Pages"
#git push --force --quiet "https://${GITHUB_TOKEN}@$github.com/${GITHUB_REPO}.git" master:gh-pages > /dev/null 2>&1