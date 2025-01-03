import React from 'react';
import * as S from '../Main.styles';
import SearchIcon from '../../../public/icons/search-icon.png';

type SearchProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Search({
  handleSubmit,
  search,
  handleSearch,
}: SearchProps) {
  return (
    <S.SerachForm onSubmit={handleSubmit}>
      <S.SearchInput
        type="text"
        placeholder="Keyword Search"
        value={search}
        onChange={handleSearch}
      />
      <S.SearchIcon src={SearchIcon} alt="Search Icon" />
    </S.SerachForm>
  );
}
