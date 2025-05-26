#!/bin/sh

# 이 스크립트의 하위 명령어가 실패하면 스크립트도 실패하도록 설정
set -e

# 디버깅을 위한 상세 출력 활성화
set -x

# 이 스크립트의 기본 실행 디렉토리는 ci_scripts 디렉토리입니다.
cd $CI_PRIMARY_REPOSITORY_PATH

echo "현재 디렉토리: $(pwd)"
echo "ios 디렉토리 내용:"
ls -la ios/

# yarn을 사용하여 Node.js 의존성 설치
yarn install --frozen-lockfile

# React Native를 위한 .xcode.env 파일 생성
cd ios
echo export NODE_BINARY=$(command -v node) > .xcode.env

echo "pod install 실행 전 ios 디렉토리 내용:"
ls -la

# 기존 CocoaPods 설치 완전 정리 (Xcode Cloud에서는 캐시 경로가 다름)
rm -rf Pods
rm -rf Podfile.lock

# CocoaPods 의존성을 상세 출력과 함께 설치
pod install --verbose --repo-update

echo "pod install 실행 후 ios 디렉토리 내용:"
ls -la
echo "Pods/Target Support Files 디렉토리 내용:"
ls -la "Pods/Target Support Files/"
echo "Pods-GenD 디렉토리 내용:"
ls -la "Pods/Target Support Files/Pods-GenD/" || echo "Pods-GenD 디렉토리가 존재하지 않습니다"

exit 0
