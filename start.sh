#!/bin/sh

echo "Hello from Cezerin3..."
echo "Checking for nodejs and yarnpkg"
node -v
yarn -v
echo "................................"

echo "Installing Packages"
yarn
echo "................................"

echo "Building theme file"
yarn theme:build
echo "................................"

echo "Adding theme file"
yarn add ./theme
echo "................................"

echo "Building Cezerin3"
yarn build
echo "................................"

echo "Starting store..."
echo "You can see the the store at http://localhost:3000"
echo "Thankyou for using Cezerin3"
echo "And please consider monetery support because it takes years of human time to make this..."
yarn start
