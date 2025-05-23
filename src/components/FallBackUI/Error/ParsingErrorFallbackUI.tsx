import React from 'react';
import {
  DataIcon,
  IconText,
  CodeBlock,
  CodeText,
  ErrorTitle,
  ErrorMessage,
  RetryButton,
  ButtonText,
  ErrorContainer,
} from './ParsingErrorFallbackUI.style';
import {ErrorBoundaryProps} from './types';
import {getErrorInfo} from '@/utils/error';
/**
 * 파싱 오류가 발생했을 때 표시되는 컴포넌트입니다.
 * 네트워크를 통해 받아온 Json 을 파싱하는 중 문제가 발생했을 때 표시됩니다.
 * @author 홍규진
 */

const ParsingErrorFallbackUI = ({error, resetError}: ErrorBoundaryProps) => {
  const errorInfo = getErrorInfo(error);

  return (
    <ErrorContainer>
      <DataIcon>
        <IconText>🔄</IconText>
      </DataIcon>
      <ErrorTitle>{errorInfo.message}</ErrorTitle>
      <ErrorMessage>
        데이터를 처리하는 중 문제가 발생했습니다. 앱을 다시 시작하거나
        고객센터에 문의해주세요.
      </ErrorMessage>
      {errorInfo.details && (
        <CodeBlock>
          <CodeText>{errorInfo.details}</CodeText>
        </CodeBlock>
      )}
      <RetryButton onPress={resetError}>
        <ButtonText>다시 시도</ButtonText>
      </RetryButton>
    </ErrorContainer>
  );
};

export default ParsingErrorFallbackUI;
