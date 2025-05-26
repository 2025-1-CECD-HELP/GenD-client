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

# 기존 CocoaPods 설치 완전 정리
rm -rf Pods
rm -rf Podfile.lock
rm -rf ~/Library/Caches/CocoaPods
rm -rf ~/Library/Developer/Xcode/DerivedData/*

# CocoaPods 저장소 업데이트
pod repo update

# CocoaPods 의존성을 상세 출력과 함께 설치
pod install --verbose

# Pods 디렉토리 권한 확인 및 수정
chmod -R 755 Pods
chmod -R 755 Pods/Target\ Support\ Files

# xcconfig 파일들이 제대로 생성되었는지 확인
if [ ! -f "Pods/Target Support Files/Pods-GenD/Pods-GenD.release.xcconfig" ]; then
    echo "xcconfig 파일이 생성되지 않았습니다. Pods 재설치를 시도합니다."
    pod deintegrate
    pod cache clean --all
    pod install --verbose
fi

# xcfilelist 파일들이 제대로 생성되었는지 확인
if [ ! -f "Pods/Target Support Files/Pods-GenD/Pods-GenD-frameworks-Release-output-files.xcfilelist" ] || \
   [ ! -f "Pods/Target Support Files/Pods-GenD/Pods-GenD-resources-Release-output-files.xcfilelist" ] || \
   [ ! -f "Pods/Target Support Files/Pods-GenD/Pods-GenD-frameworks-Release-input-files.xcfilelist" ] || \
   [ ! -f "Pods/Target Support Files/Pods-GenD/Pods-GenD-resources-Release-input-files.xcfilelist" ]; then
    echo "xcfilelist 파일들이 생성되지 않았습니다. Pods 재설치를 시도합니다."
    pod deintegrate
    pod cache clean --all
    pod install --verbose
fi

echo "pod install 실행 후 ios 디렉토리 내용:"
ls -la
echo "Pods 디렉토리 내용:"
ls -la Pods/

exit 0
