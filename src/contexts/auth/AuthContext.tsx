// src/context/AuthContext.tsx
import React, {createContext, useState, useContext, useEffect} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

type TAuthContextType = {
  isSignedIn: boolean;
  isLoading: boolean;
  signOut: () => Promise<void>;
  handleAuthError: (error: Error) => void;
};

/**
 * 인증 상태를 관리하는 Context입니다.
 * 인증 상태를 확인하고 로그인 및 로그아웃을 처리합니다.
 * 백엔드 인증 로직이 완료되면 이 파일을 수정해야합니다.
 * @author 홍규진
 */
const AuthContext = createContext<TAuthContextType | null>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // 앱 시작 시 인증 상태 확인
    const checkAuthState = async () => {
      try {
        const token = await EncryptedStorage.getItem('accessToken');
        setIsSignedIn(!!token);
      } catch (error) {
        handleAuthError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, []);

  const signOut = async () => {
    try {
      await EncryptedStorage.removeItem('accessToken');
      setIsSignedIn(false);
    } catch (error) {
      console.error('로그아웃 실패:', error);
      throw error;
    }
  };
  const handleAuthError = (error: Error) => {
    console.error('인증 오류:', error);
    throw error;
  };

  return (
    <AuthContext.Provider
      value={{isSignedIn, isLoading, signOut, handleAuthError}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 내에서만 사용할 수 있습니다');
  }
  return context;
};
