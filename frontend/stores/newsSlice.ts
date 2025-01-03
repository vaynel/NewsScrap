import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NewsState {
  isDetailView: boolean; // 상세보기 여부
  selectedNews: {
    id: number;
    url: string;
    title: string;
    description: string;
    categary: string;
    pubData: Date;
    keywords: string[];
  } | null; // 선택된 뉴스 데이터
}

const initialState: NewsState = {
  isDetailView: false,
  selectedNews: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    showNewsDetail(state, action: PayloadAction<NewsState['selectedNews']>) {
      state.isDetailView = true;
      state.selectedNews = action.payload;
    },
    hideNewsDetail(state) {
      state.isDetailView = false;
      state.selectedNews = null;
    },
  },
});

export const { showNewsDetail, hideNewsDetail } = newsSlice.actions;
export default newsSlice.reducer;
