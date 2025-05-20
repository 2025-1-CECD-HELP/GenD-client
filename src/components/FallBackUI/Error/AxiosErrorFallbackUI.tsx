import React from 'react';
import {AxiosError} from 'axios';
import {
  ErrorContainer,
  NetworkIcon,
  IconText,
  StatusBadge,
  StatusText,
  ErrorTitle,
  ErrorMessage,
  RetryButton,
  ButtonText,
} from './AxiosErrorFallbackUI.style';
import {getErrorInfo} from '@/utils/error';
import {ErrorBoundaryProps} from './types';

/**
 * Axios 에러가 발생했을 때 표시되는 컴포넌트입니다.
 * 네트워크 오류가 발생했을 때 표시되는 컴포넌트입니다.
 * @author 홍규진
 */

const AxiosErrorFallbackUI = ({error, resetError}: ErrorBoundaryProps) => {
  const axiosError = error as AxiosError;
  const errorInfo = getErrorInfo(axiosError);

  return (
    <ErrorContainer>
      <NetworkIcon>
        <IconText>📡</IconText>
      </NetworkIcon>
      <ErrorTitle>{errorInfo.message}</ErrorTitle>
      {errorInfo.statusCode && (
        <StatusBadge>
          <StatusText>Status: {errorInfo.statusCode}</StatusText>
        </StatusBadge>
      )}
      {errorInfo.details && <ErrorMessage>{errorInfo.details}</ErrorMessage>}
      <RetryButton onPress={resetError}>
        <ButtonText>다시 시도</ButtonText>
      </RetryButton>
    </ErrorContainer>
  );
};

export default AxiosErrorFallbackUI;
