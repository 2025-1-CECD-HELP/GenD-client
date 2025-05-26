#!/bin/sh

set -e
set -x

echo "=========================================="
echo "CI_POST_CLONE_SCRIPT 시작"
echo "현재 디렉토리: $(pwd)"
echo "=========================================="

# 프로젝트 루트로 이동 (스크립트가 ios/ci_scripts에서 실행되므로)
cd ../..

echo "프로젝트 루트로 이동: $(pwd)"

# Homebrew 설치 확인 및 설치
if ! command -v brew &> /dev/null; then
    echo "Homebrew가 설치되어 있지 않습니다. 설치를 시작합니다..."
    # Xcode Cloud에서는 보통 이미 설치되어 있음
else
    echo "Homebrew 버전: $(brew --version)"
fi

# CocoaPods 설치 확인 및 설치
if ! command -v pod &> /dev/null; then
    echo "CocoaPods가 설치되어 있지 않습니다. 설치를 시작합니다..."
    brew install cocoapods
else
    echo "CocoaPods가 이미 설치되어 있습니다: $(pod --version)"
fi

# Node.js 설치 확인 및 설치
if ! command -v node &> /dev/null; then
    echo "Node.js가 설치되어 있지 않습니다. 설치를 시작합니다..."
    brew install node
else
    echo "Node.js가 이미 설치되어 있습니다: $(node --version)"
fi

# yarn 설치 확인 및 설치
if ! command -v yarn &> /dev/null; then
    echo "yarn이 설치되어 있지 않습니다. 설치를 시작합니다..."
    brew install yarn
else
    echo "yarn이 이미 설치되어 있습니다: $(yarn --version)"
fi

# yarn을 사용하여 Node.js 의존성 설치
echo "===== Running yarn install ====="
yarn install --frozen-lockfile

# iOS 디렉토리로 이동
echo "===== iOS 디렉토리로 이동 ====="
cd ios

# .xcode.env 파일 생성
echo export NODE_BINARY=$(command -v node) > .xcode.env
echo ".xcode.env 파일 생성 완료: $(cat .xcode.env)"

# CocoaPods 의존성 설치
echo "===== Running pod install ====="
pod install --repo-update

echo "=========================================="
echo "CI_POST_CLONE_SCRIPT 완료"
echo "=========================================="

exit 0
