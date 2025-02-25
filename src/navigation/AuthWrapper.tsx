// src/navigation/AuthScreen.tsx
import React, {useEffect} from 'react';
import {useAuth} from '@/contexts/auth/AuthContext';
import useTypeSafeNavigation from '@/hooks/useTypeSafeNavigaion';

type AuthWrapperProps = {
  component: React.ComponentType<any>;
  isAuthNeed?: boolean;
};

export const AuthWrapper: React.FC<AuthWrapperProps> = ({
  isAuthNeed = false,
  component: Component,
}) => {
  const {isSignedIn} = useAuth();
  const router = useTypeSafeNavigation();

  useEffect(() => {
    if (isAuthNeed && !isSignedIn) {
      router.replace('LOGIN', {});
    }
  }, [isAuthNeed, isSignedIn, router]);

  if (isAuthNeed && !isSignedIn) {
    return null;
  }

  return <Component />;
};
