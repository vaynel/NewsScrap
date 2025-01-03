'use client'; // 클라이언트 전용 컴포넌트 선언

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/stores/store';

const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
