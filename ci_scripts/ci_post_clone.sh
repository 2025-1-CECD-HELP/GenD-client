#!/bin/sh

set -e
set -x

echo "=========================================="
echo "CI_POST_CLONE_SCRIPT 시작"
echo "=========================================="

# 환경 변수 확인
echo "CI_PRIMARY_REPOSITORY_PATH: $CI_PRIMARY_REPOSITORY_PATH"

cd $CI_PRIMARY_REPOSITORY_PATH

# Homebrew 설치 확인 (Xcode Cloud에는 기본적으로 설치되어 있음)
if ! command -v brew &> /dev/null; then
    echo "Homebrew가 설치되어 있지 않습니다."
    # Xcode Cloud에서는 보통 이미 설치되어 있음
else
    echo "Homebrew 버전: $(brew --version)"
fi

# CocoaPods 설치
if ! command -v pod &> /dev/null; then
    echo "CocoaPods 설치 중..."
    brew install cocoapods
else
    echo "CocoaPods가 이미 설치되어 있습니다: $(pod --version)"
fi

# yarn 의존성 설치
yarn install --frozen-lockfile

# iOS 디렉토리로 이동
cd ios

# .xcode.env 파일 생성
echo export NODE_BINARY=$(command -v node) > .xcode.env

# CocoaPods 설치
pod install --repo-update

echo "=========================================="
echo "CI_POST_CLONE_SCRIPT 완료"
echo "=========================================="

exit 0
