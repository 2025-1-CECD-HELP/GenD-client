## 주의사항

해당 파일은 import 해올 때 절대 경로 사용시 기존의 @types 경로와 충돌이 날 수 있습니다.

## 해결방법

해결방법은 다음과 같습니다.

```ts
import {TRouteParams} from '@/types/navigation';
```
