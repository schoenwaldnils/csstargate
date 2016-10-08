#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

npm run build
npm run deploy
git push -u origin gh-pages
