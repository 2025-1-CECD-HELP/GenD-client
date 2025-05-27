// src/navigation/AuthScreen.tsx
import React, {useEffect} from 'react';
import {useAtom} from 'jotai';
import {isSignedInAtom, isLoadingAtom} from '@/atoms/auth';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';
import {ROUTE_NAMES} from '@/constants/routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TRouteParams} from '@/navigation/types';

type AuthWrapperProps<T extends keyof TRouteParams> = {
  component: React.ComponentType<NativeStackScreenProps<TRouteParams, T>>;
  isAuthNeed?: boolean;
  props: NativeStackScreenProps<TRouteParams, T>;
};

export const AuthWrapper = <T extends keyof TRouteParams>({
  isAuthNeed = false,
  component: Component,
  props,
}: AuthWrapperProps<T>) => {
  const [isSignedIn] = useAtom(isSignedInAtom);
  const [isLoading] = useAtom(isLoadingAtom);
  const navigation = useTypeSafeNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      if (!isLoading && isAuthNeed && !isSignedIn) {
        console.log('인증이 필요합니다. 로그인 화면으로 이동합니다.');
        navigation.reset({
          index: 0,
          routes: [{name: ROUTE_NAMES.LOGIN}],
        });
      }
    };

    checkAuth();
  }, [isAuthNeed, isSignedIn, isLoading, navigation]);

  // 로딩 중이거나 인증이 필요없는 경우 컴포넌트 렌더링
  if (isLoading || !isAuthNeed) {
    return <Component {...props} />;
  }

  // 인증이 필요한데 로그인되지 않은 경우 null 반환 (리다이렉트 중)
  if (!isSignedIn) {
    return null;
  }

  // 인증된 경우에만 컴포넌트 렌더링
  return <Component {...props} />;
};
