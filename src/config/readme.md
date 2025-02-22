## 환경 설정

- react-native-dotenv 를 사용하여 환경 설정 파일을 사용합니다.
- 해당 폴더 내에는 환경 설정 파일들이 있습니다.
- 환경 설정 파일은 환경 별로 분리되어 있습니다.
- development, staging, production 환경 별로 분리되어 있습니다.

## 환경 설정 파일 문의처

- hkj0206@dgu.ac.kr 에 문의하세요.
- 010-5820-4625 홍규진님께 문의하세요.

## 사용법

- 해당 파일은 나중에 script 별로 실제 .env 파일을 다르게 생성해서 사용합니다.
- 예를 들어, yarn:dev 명령어를 사용하면 development 환경에서 사용되는 .env.development 파일을 사용합니다.
- 예를 들어, yarn:staging 명령어를 사용하면 staging 환경에서 사용되는 .env.staging 파일을 사용합니다.
- 예를 들어, yarn:prod 명령어를 사용하면 production 환경에서 사용되는 .env.production 파일을 사용합니다.

## 최종 결과물

- 최종적으로 생겨난 .env 파일에 따라서, 각기 다른 환경에 맞는 파일을 사용합니다.
- 이는 추가적으로 Xcode 에서 환경 별로 다른 파일을 사용할 수 있도록 설정해야 합니다.

## 배포

- 배포 전에 반드시 환경 설정 파일을 확인해야 합니다.
- iOS의 경우엔, Xcode 내 Scheme 에서 환경 별로 다른 파일을 사용할 수 있도록 설정해야 합니다.
