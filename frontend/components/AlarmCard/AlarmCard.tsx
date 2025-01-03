"use client";

import React from "react";
import * as S from "./AlarmCard.style";

interface AlarmCardProps {
    keyword: string;
    onViewClick: () => void;
}

export default function AlarmCard({ keyword, onViewClick }: AlarmCardProps) {
    return (
        <S.AlarmCardContainer>
            <S.MessageText>
                “{keyword}”에 대한 새로운 뉴스
            </S.MessageText>
            <S.ViewButton onClick={onViewClick}>바로보기</S.ViewButton>
        </S.AlarmCardContainer>
    );
}
