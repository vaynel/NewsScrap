import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Keyword = {
  id: number;
  keyword: string;
};
interface SelectedNews {
  id: number;
  url: string;
  title: string;
  description: string;
  category: string; // 수정: 오타 'categary' -> 'category'
  pubData: Date;
  keywords: Keyword[];
}

interface NewsState {
  isDetailView: boolean; // 상세보기 여부
  selectedNews: SelectedNews | null; // 선택된 뉴스 데이터
  page: number; // 현재 페이지
  category: string; // 선택된 카테고리
}

const initialState: NewsState = {
  isDetailView: false,
  selectedNews: null,
  page: 1, // 초기 페이지 번호
  category: '전체', // 기본 카테고리
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    // 상세보기 활성화
    showNewsDetail(state, action: PayloadAction<SelectedNews>) {
      state.isDetailView = true;
      state.selectedNews = action.payload;
    },
    // 상세보기 비활성화
    hideNewsDetail(state) {
      state.isDetailView = false;
      state.selectedNews = null;
    },
    // 페이지 설정
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    // 카테고리 설정 (페이지 초기화 포함)
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
      state.page = 1; // 카테고리 변경 시 페이지 초기화
    },
    // 상태 초기화
    resetNewsState(state) {
      state.isDetailView = false;
      state.selectedNews = null;
      state.page = 1;
      state.category = '전체';
    },
  },
});

export const {
  showNewsDetail,
  hideNewsDetail,
  setPage,
  setCategory,
  resetNewsState,
} = newsSlice.actions;

export default newsSlice.reducer;
