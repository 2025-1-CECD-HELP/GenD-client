import React, {useState} from 'react';
import {FilePreview} from './index';
import {FileData} from './index';
import {
  FilePreviewContainer,
  columnWrapperStyle,
  FilePreviewWrapper,
} from './FilePreviewList.style';

/**
 * 자료 관리 페이지에 사용될 파일 프리뷰 리스트 컴포넌트입니다.
 * props로 files(파일 정보), position(현재 유저의 권한), 그리고 사용되는 함수들을 받습니다.
 * position에 따라 FilePreview의 액션 영역 클릭 시 실행될 onPressAction 함수가 달라집니다.
 * - member 권한 : onPressDownload 함수 선택
 * - manager 권한 : onPressMoreIcon 함수 선택
 * FilePreview 컴포넌트를 FlatList를 통해 2열 그리드 형태로 레이아웃을 구성하였습니다.
 * @author 이정선
 */

export type FilePreviewListProps = {
  files: FileData[];
  position: 'member' | 'manager';
  onPressFile: (file: FileData) => void;
  onPressDownload: (file: FileData) => void;
  onPressMoreIcon: (file: FileData) => void;
};

export const FilePreviewList = ({
  files,
  position,
  onPressFile,
  onPressDownload,
  onPressMoreIcon,
}: FilePreviewListProps) => {
  const numColumns = 2;
  const [containerWidth, setContainerWidth] = useState(0);
  return (
    <FilePreviewContainer
      data={files}
      columnWrapperStyle={columnWrapperStyle}
      onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
      renderItem={({item}) =>
        containerWidth > 0 ? (
          <FilePreviewWrapper width={(containerWidth - 16) / 2}>
            <FilePreview
              file={item}
              position={position}
              onPressFile={() => onPressFile(item)}
              onPressAction={
                position === 'member'
                  ? () => onPressDownload(item)
                  : () => onPressMoreIcon(item)
              }
            />
          </FilePreviewWrapper>
        ) : null
      }
      keyExtractor={(item, index) => index.toString()}
      numColumns={numColumns}
    />
  );
};
