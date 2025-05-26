#!/bin/zsh
echo "===== Installing CocoaPods ====="
export HOMEBREW_NO_INSTALL_CLEANUP=TRUE
brew install cocoapods

echo "===== Installing Node.js ====="
brew install node@21

echo "===== Installing yarn ====="
brew install yarn

# 의존성 설치
echo "===== Running yarn install ====="
yarn install

echo "===== Running pod install ====="
cd ios
pod install
