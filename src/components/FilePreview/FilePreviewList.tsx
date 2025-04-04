import React from 'react';
import {View, SafeAreaView, FlatList} from 'react-native';
import {FilePreview} from './index';
import {FileData} from './index';

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

  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={files}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 16,
            gap: 16,
          }}
          style={{overflow: 'visible'}}
          renderItem={({item}) => (
            <View style={{flex: 1}}>
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
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
        />
      </View>
    </SafeAreaView>
  );
};
