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


# React Native 번들 생성 (main.jsbundle)
echo "===== React Native 번들 생성 ====="
npx react-native bundle \
  --entry-file='index.js' \
  --bundle-output='./ios/main.jsbundle' \
  --dev=false \
  --platform='ios' \
  --assets-dest='./ios'

echo "main.jsbundle 생성 완료: $(ls -la ios/main.jsbundle)"


# iOS 디렉토리로 이동
echo "===== iOS 디렉토리로 이동 ====="
cd ios

# .xcode.env 파일 생성
echo export NODE_BINARY=$(command -v node) > .xcode.env
echo ".xcode.env 파일 생성 완료: $(cat .xcode.env)"

# GoogleService-Info.plist 파일 생성
echo "환경변수 참조 GoogleService-Info.plist file 생성시작"

# Boolean 값 변환
convert_bool() {
    if [ "$1" == "true" ]; then
        echo "<true/>"
    else
        echo "<false/>"
    fi
}

cat <<EOF > "/Volumes/workspace/repository/BookBridge/GoogleService-Info.plist"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CLIENT_ID</key>
    <string>$(CLIENT_ID)</string>
    <key>REVERSED_CLIENT_ID</key>
    <string>$(REVERSED_CLIENT_ID)</string>
    <key>API_KEY</key>
    <string>$(API_KEY)</string>
    <key>GCM_SENDER_ID</key>
    <string>$(GCM_SENDER_ID)</string>
    <key>PLIST_VERSION</key>
    <string>$(PLIST_VERSION)</string>
    <key>BUNDLE_ID</key>
    <string>$(BUNDLE_ID)</string>
    <key>PROJECT_ID</key>
    <string>$(PROJECT_ID)</string>
    <key>STORAGE_BUCKET</key>
    <string>$(STORAGE_BUCKET)</string>
    <key>IS_ADS_ENABLED</key>
    `convert_bool ${IS_ADS_ENABLED}`
    <key>IS_ANALYTICS_ENABLED</key>
    `convert_bool ${IS_ANALYTICS_ENABLED}`
    <key>IS_APPINVITE_ENABLED</key>
    `convert_bool ${IS_APPINVITE_ENABLED}`
    <key>IS_GCM_ENABLED</key>
    `convert_bool ${IS_GCM_ENABLED}`
    <key>IS_SIGNIN_ENABLED</key>
    `convert_bool ${IS_SIGNIN_ENABLED}`
    <key>GOOGLE_APP_ID</key>
    <string>$(GOOGLE_APP_ID)</string>
</dict>
</plist>
EOF
echo "환경변수 참조 GoogleService-Info.plist file 생성완료"
# CocoaPods 의존성 설치
echo "===== Running pod install ====="
pod install --repo-update

echo "=========================================="
echo "CI_POST_CLONE_SCRIPT 완료"
echo "=========================================="

exit 0
