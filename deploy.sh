#!/bin/bash

# deploy
rm -rf *.js *.map *.gz *.css *.html
cp -R dist/. ./
rm -rf dist
git commit -am "Deploy to Github Pages"
git push --force "https://${GITHUB_TOKEN}@$github.com/${GITHUB_REPO}.git"