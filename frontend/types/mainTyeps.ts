export type NewsCard = {
  id: number;
  url: string;
  title: string;
  description: string;
  category: string;
  pubData: Date;
  keywords: Keyword[];
  isScreenShot: boolean;
};

type Keyword = {
  id: number;
  keyword: string;
};

export type Ranking = {
  rankinData: {
    id: number;
    title: string;
    views: number;
  }[];
};
