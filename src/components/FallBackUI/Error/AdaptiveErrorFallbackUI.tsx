import React from 'react';
import {AxiosError} from 'axios';
import RenderingErrorFallbackUI from './RenderingErrorFallbackUI';
import AxiosErrorFallbackUI from './AxiosErrorFallbackUI';
import ParsingErrorFallbackUI from './ParsingErrorFallbackUI';
import {ErrorBoundaryProps} from './types';

/**
 * 에러 타입에 따라 적절한 Fallback UI를 선택하는 컴포넌트입니다.
 * Axios 에러, Parsing 에러, Rendering 에러를 처리합니다.
 * @author 홍규진
 */
export const AdaptiveErrorFallback = (props: ErrorBoundaryProps) => {
  const {error, resetError} = props;

  // Axios 에러 체크
  if (error instanceof AxiosError) {
    return <AxiosErrorFallbackUI error={error} resetError={resetError} />;
  }

  // 파싱 에러 체크 (SyntaxError, TypeError 등)
  if (
    error instanceof SyntaxError ||
    error instanceof TypeError ||
    error.message.includes('parse') ||
    error.message.includes('JSON')
  ) {
    return <ParsingErrorFallbackUI error={error} resetError={resetError} />;
  }

  // 기본적으로 렌더링 에러로 처리
  return <RenderingErrorFallbackUI error={error} resetError={resetError} />;
};
