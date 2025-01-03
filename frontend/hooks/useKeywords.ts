import { useState } from "react";

export const useKeywords = (initialKeywords: string[]) => {
  const [keywords, setKeywords] = useState<string[]>(initialKeywords);
  const [search, setSearch] = useState<string>("");

  // 키워드 추가
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 입력값이 이미 존재하는지 체크
    if (keywords.includes(search)) {
      alert("이미 입력된 키워드입니다.");
      return;
    }

    // 키워드 길이 조건 체크
    if (search.length < 2) {
      alert("2글자 이상 입력해주세요.");
      return;
    }

    // 키워드 추가
    setKeywords((prevKeywords) => [...prevKeywords, search]);
    setSearch(""); // 입력 필드 초기화
  };

  // 검색 입력값 처리
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // 키워드 삭제
  const handleDelete = (keywordDelete: string) => {
    setKeywords((prev) => prev.filter((keyword) => keyword !== keywordDelete));
  };

  return {
    keywords,
    search,
    handleSubmit,
    handleSearch,
    handleDelete,
  };
};
