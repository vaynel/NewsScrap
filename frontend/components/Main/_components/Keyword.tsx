import React, { useState } from 'react';
import * as S from '../Main.styles';

type KeywordProps = {
  keywords: string[];
  handleDelete: (keyword: string) => void;
};

export default function Keyword({ keywords, handleDelete }: KeywordProps) {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

  const handleKeywordClick = (keyword: string) => {
    console.log(keyword);
    setSelectedKeyword((prev) => (prev === keyword ? null : keyword)); // 선택/해제 토글
  };

  return (
    <S.KeywordContainer>
      {keywords.map((keyword) => (
        <S.Keyword
          key={keyword}
          selected={selectedKeyword === keyword}
          onClick={() => handleKeywordClick(keyword)}
        >
          {keyword}
          <S.DeleteBtn onClick={() => handleDelete(keyword)}>X</S.DeleteBtn>
        </S.Keyword>
      ))}
    </S.KeywordContainer>
  );
}
