"use client";

import React from "react";
import AlarmCard from "./AlarmCard";

export default function AlarmCardWrapper() {
    const handleViewClick = () => {
        alert("바로보기 버튼 클릭됨");
    };

    return <AlarmCard keyword="테스트 키워드" onViewClick={handleViewClick} />;
}
