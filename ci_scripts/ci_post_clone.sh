#!/bin/sh

# 이 스크립트의 하위 명령어가 실패하면 스크립트도 실패하도록 설정
set -e

# 이 스크립트의 기본 실행 디렉토리는 ci_scripts 디렉토리입니다.
cd $CI_PRIMARY_REPOSITORY_PATH

# yarn을 사용하여 Node.js 의존성 설치
yarn install --frozen-lockfile

# React Native를 위한 .xcode.env 파일 생성
cd ios
echo export NODE_BINARY=$(command -v node) > .xcode.env

# CocoaPods 의존성 설치
pod install



exit 0
