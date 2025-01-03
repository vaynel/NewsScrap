import React from "react";
import * as S from "../Main.styles";
import { Ranking as RankingType } from "@/types/mainTyeps";

type RankingProps = {
  newsRanking: RankingType["rankinData"];
};
export default function Ranking({ newsRanking }: RankingProps) {
  // 조회수 기준 내림차순 정렬 후 상위 10개 항목만 추출
  const topRateNews = newsRanking
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  return (
    <S.RankingContainer>
      <S.RightTitle>금주 뉴스레터 랭킹</S.RightTitle>
      <S.RankingBox>
        <S.NewsRanking>등수</S.NewsRanking>
        <S.RankingTitle>제목</S.RankingTitle>
        <S.RankingViews>view</S.RankingViews>
      </S.RankingBox>
      {topRateNews.map((data, i) => (
        <S.RankingBox key={data.id}>
          <S.NewsRanking>{i + 1}</S.NewsRanking>
          <S.RankingTitle>{data.title}</S.RankingTitle>
          <S.RankingViews>{data.views}</S.RankingViews>
        </S.RankingBox>
      ))}
    </S.RankingContainer>
  );
}
