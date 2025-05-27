#!/bin/sh

set -e
set -x

echo "🚀 =========================================="
echo "🚀 CI_POST_CLONE_SCRIPT 시작"
echo "🚀 현재 디렉토리: $(pwd)"
echo "🚀 =========================================="

# 📦 캐시 디렉토리 설정
PODS_CACHE_DIR="$HOME/Library/Caches/CocoaPods"
YARN_CACHE_DIR="$HOME/.yarn-cache"
HOMEBREW_CACHE_DIR="$HOME/Library/Caches/Homebrew"
PODS_BACKUP_DIR="$HOME/Library/Caches/PodsBackup"

# 📁 캐시 디렉토리 생성
mkdir -p "$PODS_CACHE_DIR"
mkdir -p "$YARN_CACHE_DIR"
mkdir -p "$HOMEBREW_CACHE_DIR"
mkdir -p "$PODS_BACKUP_DIR"

# 🍺 Homebrew 캐시 설정
export HOMEBREW_CACHE="$HOMEBREW_CACHE_DIR"

# 📂 프로젝트 루트로 이동
cd ../..
echo "📂 프로젝트 루트로 이동: $(pwd)"

# 🍺 Homebrew 설치 확인 및 설치
if ! command -v brew &> /dev/null; then
    echo "🍺 Homebrew가 설치되어 있지 않습니다. 설치를 시작합니다..."
else
    echo "🍺 Homebrew 버전: $(brew --version)"
fi

# 📦 CocoaPods 설치 확인 및 설치
if ! command -v pod &> /dev/null; then
    echo "📦 CocoaPods가 설치되어 있지 않습니다. 설치를 시작합니다..."
    brew install cocoapods
else
    echo "📦 CocoaPods가 이미 설치되어 있습니다: $(pod --version)"
fi

# ⚡️ Node.js 설치 확인 및 설치
if ! command -v node &> /dev/null; then
    echo "⚡️ Node.js가 설치되어 있지 않습니다. 설치를 시작합니다..."
    brew install node
else
    echo "⚡️ Node.js가 이미 설치되어 있습니다: $(node --version)"
fi

# 🧶 yarn 설치 확인 및 설치
if ! command -v yarn &> /dev/null; then
    echo "🧶 yarn이 설치되어 있지 않습니다. 설치를 시작합니다..."
    brew install yarn
else
    echo "🧶 yarn이 이미 설치되어 있습니다: $(yarn --version)"
fi

# 📦 yarn을 사용하여 Node.js 의존성 설치 (캐시 활용)
echo "📦 ===== Running yarn install ====="
yarn install --frozen-lockfile --cache-folder "$YARN_CACHE_DIR"

# 📝 Storybook 비활성화를 위한 임시 Metro 설정 생성
echo "📝 ===== Storybook 비활성화 Metro 설정 생성 ====="
cp metro.config.js metro.config.js.backup

# 📝 Storybook 없는 Metro 설정으로 임시 교체
cat > metro.config.js << 'EOF'
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const projectConfig = {
  transformer: {
    unstable_allowRequireContext: true,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    sourceExts: [...defaultConfig.resolver.sourceExts, 'cjs', 'mjs', 'svg'],
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    alias: {
      '@': require('path').resolve(__dirname, './src'),
    },
  },
};

module.exports = mergeConfig(defaultConfig, projectConfig);
EOF

# 📦 React Native 번들 생성 (main.jsbundle)
echo "📦 ===== React Native 번들 생성 ====="
npx react-native bundle \
  --entry-file='index.js' \
  --bundle-output='./ios/main.jsbundle' \
  --dev=false \
  --platform='ios' \
  --assets-dest='./ios'

echo "📦 main.jsbundle 생성 완료: $(ls -la ios/main.jsbundle)"

# 📂 iOS 디렉토리로 이동
echo "📂 ===== iOS 디렉토리로 이동 ====="
cd ios

# ⚙️ .xcode.env 파일 생성
echo export NODE_BINARY=$(command -v node) > .xcode.env
echo "⚙️ .xcode.env 파일 생성 완료: $(cat .xcode.env)"

# 🔑 GoogleService-Info.plist 파일 생성
echo "🔑 환경변수 참조 GoogleService-Info.plist file 생성시작"

# 🔄 Boolean 값 변환
convert_bool() {
    if [ "$1" == "true" ]; then
        echo "<true/>"
    else
        echo "<false/>"
    fi
}

cat <<EOF > GoogleService-Info.plist
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CLIENT_ID</key>
    <string>${CLIENT_ID}</string>
    <key>REVERSED_CLIENT_ID</key>
    <string>${REVERSED_CLIENT_ID}</string>
    <key>API_KEY</key>
    <string>${API_KEY}</string>
    <key>GCM_SENDER_ID</key>
    <string>${GCM_SENDER_ID}</string>
    <key>PLIST_VERSION</key>
    <string>${PLIST_VERSION}</string>
    <key>BUNDLE_ID</key>
    <string>${BUNDLE_ID}</string>
    <key>PROJECT_ID</key>
    <string>${PROJECT_ID}</string>
    <key>STORAGE_BUCKET</key>
    <string>${STORAGE_BUCKET}</string>
    <key>IS_ADS_ENABLED</key>
    $(convert_bool ${IS_ADS_ENABLED})
    <key>IS_ANALYTICS_ENABLED</key>
    $(convert_bool ${IS_ANALYTICS_ENABLED})
    <key>IS_APPINVITE_ENABLED</key>
    $(convert_bool ${IS_APPINVITE_ENABLED})
    <key>IS_GCM_ENABLED</key>
    $(convert_bool ${IS_GCM_ENABLED})
    <key>IS_SIGNIN_ENABLED</key>
    $(convert_bool ${IS_SIGNIN_ENABLED})
    <key>GOOGLE_APP_ID</key>
    <string>${GOOGLE_APP_ID}</string>
</dict>
</plist>
EOF

echo "🔑 환경변수 참조 GoogleService-Info.plist file 생성완료"

# 📦 CocoaPods 캐시 전략 및 설치
echo "📦 ===== CocoaPods 캐시 전략 시작 ====="

# Podfile.lock 체크섬으로 캐시 키 생성
if [ -f "Podfile.lock" ]; then
    PODFILE_CHECKSUM=$(shasum Podfile.lock | cut -d' ' -f1)
else
    PODFILE_CHECKSUM="no-lock"
fi

CACHE_KEY="pods-$PODFILE_CHECKSUM"
CACHED_PODS_DIR="$PODS_BACKUP_DIR/$CACHE_KEY"

echo "📦 캐시 키: $CACHE_KEY"
echo "📦 캐시 경로: $CACHED_PODS_DIR"

# 캐시된 Pods 폴더 확인 및 복원
if [ -d "$CACHED_PODS_DIR/Pods" ]; then
    echo "📦 기존 캐시 발견! 복원 중..."
    cp -R "$CACHED_PODS_DIR/Pods" ./
    echo "📦 캐시 복원 완료, 빠른 검증 실행..."
    pod install
else
    echo "📦 캐시 없음. 새로운 설치 및 캐시 생성..."
    pod install --repo-update
    
    # 설치 완료 후 캐시 저장
    echo "📦 Pods 폴더 캐시 저장 중..."
    mkdir -p "$CACHED_PODS_DIR"
    cp -R ./Pods "$CACHED_PODS_DIR/"
    echo "📦 캐시 저장 완료: $CACHED_PODS_DIR"
fi

# 오래된 캐시 정리 (7일 이상된 캐시 삭제)
echo "📦 오래된 캐시 정리 중..."
find "$PODS_BACKUP_DIR" -type d -name "pods-*" -mtime +7 -exec rm -rf {} + 2>/dev/null || true

echo "✅ =========================================="
echo "✅ CI_POST_CLONE_SCRIPT 완료"
echo "✅ =========================================="

exit 0
