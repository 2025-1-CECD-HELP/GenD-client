import {useRef, useState} from 'react';
import {debounce} from 'es-toolkit';
/**
 * 해당 훅은 입력 필드를 관리하는 훅입니다.
 * 이는 입력 필드의 값을 관리하고, 제출 버튼을 누르면 해당 함수를 호출합니다.
 * 만약 디바운스가 필요하다면 디바운스 훅을 호출하여 사용할 수 있습니다.
 * @author 홍규진
 */
export interface UseInputProps {
  isDebouncing?: boolean;
  onSubmit: (text: string) => void;
}

export const useInput = ({onSubmit, isDebouncing = false}: UseInputProps) => {
  const [text, setText] = useState('');

  // 디바운스된 함수를 useRef로 저장하여 컴포넌트 렌더링 간에 유지
  const debouncedSubmit = useRef(
    debounce((value: string) => {
      onSubmit(value);
    }, 300),
  ).current;

  // 제출 버튼을 누르면 해당 함수를 호출합니다.
  const handleSubmit = () => {
    if (text) {
      onSubmit(text);
      setText(''); // 제출 후 입력 필드 초기화
    }
  };

  const handleChangeText = (value: string) => {
    setText(value); // 항상 로컬 상태는 즉시 업데이트

    // 디바운스가 필요하다면 디바운스된 함수 호출
    if (isDebouncing && value) {
      debouncedSubmit(value);
    }
  };

  return {
    text,
    handleChangeText,
    handleSubmit,
  };
};
