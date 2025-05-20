import React from 'react';
import {
  ErrorContainer,
  ErrorIcon,
  IconText,
  ErrorDetails,
  ErrorTitle,
  ErrorMessage,
  RetryButton,
  ButtonText,
} from './RenderingErrorFallbackUI.style';
import {ErrorBoundaryProps} from './types';
import {getErrorInfo} from '@/utils/error';
/**
 * 렌더링 오류가 발생했을 때 표시되는 컴포넌트입니다.
 * 렌더링 오류는 화면을 표시하는 중 문제가 발생했을 때 발생합니다.
 * @author 홍규진
 */

const RenderingErrorFallbackUI = ({error, resetError}: ErrorBoundaryProps) => {
  const errorInfo = getErrorInfo(error);

  return (
    <ErrorContainer>
      <ErrorIcon>
        <IconText>!</IconText>
      </ErrorIcon>
      <ErrorTitle>{errorInfo.message}</ErrorTitle>
      <ErrorMessage>
        화면을 표시하는 중 문제가 발생했습니다. 다시 시도해 주세요.
      </ErrorMessage>
      {errorInfo.details && <ErrorDetails>{errorInfo.details}</ErrorDetails>}
      <RetryButton onPress={resetError}>
        <ButtonText>다시 시도</ButtonText>
      </RetryButton>
    </ErrorContainer>
  );
};

export default RenderingErrorFallbackUI;
