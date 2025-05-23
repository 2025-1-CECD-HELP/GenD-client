import React, {useState} from 'react';
import {PreviewContainer, PreviewKey, PreviewTextInput} from './index.style';

export const PreviewContent = ({
  templateContent,
  onChange,
}: {
  templateContent: {objectKey: string; objectValue: string}[];
  onChange: (values: {objectKey: string; objectValue: string}[]) => void;
}) => {
  const [values, setValues] = useState(
    templateContent.map(item => ({
      objectKey: String(item.objectKey),
      objectValue: String(item.objectValue),
    })),
  );

  const handleChange = (idx: number, text: string) => {
    const newValues = values.map((item, i) =>
      i === idx ? {...item, objectValue: text} : item,
    );
    setValues(newValues);
    onChange(newValues);
  };

  return (
    <>
      {values.map((item, idx) => (
        <PreviewContainer key={idx}>
          <PreviewKey>{item.objectKey}</PreviewKey>
          <PreviewTextInput
            value={item.objectValue}
            onChangeText={text => handleChange(idx, text)}
            numberOfLines={1}
            maxLength={100}
            placeholder="입력"
            underlineColorAndroid="transparent"
          />
        </PreviewContainer>
      ))}
    </>
  );
};
