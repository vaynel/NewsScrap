import React from "react";
import * as S from "../Main.styles";

type KeywordProps = {
  keywords: string[];
  handleDelete: (keyword: string) => void;
};

export default function Keyword({ keywords, handleDelete }: KeywordProps) {
  return (
    <S.KeywordContainer>
      {keywords.map((keyword) => (
        <S.Keyword key={keyword}>
          {keyword}
          <S.DeleteBtn onClick={() => handleDelete(keyword)}>X</S.DeleteBtn>
        </S.Keyword>
      ))}
    </S.KeywordContainer>
  );
}
