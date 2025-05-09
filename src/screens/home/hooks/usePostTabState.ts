import {useState} from 'react';
import {CurrentPostTab} from '../types';

/**
 * @author 이정선
 */

export const usePostTabState = () => {
  const [postTabState, setPostTabState] = useState<CurrentPostTab>('all');

  const handleClick = (tab: CurrentPostTab) => {
    setPostTabState(tab);
  };

  return {
    handleClick,
    postTabState,
  };
};
