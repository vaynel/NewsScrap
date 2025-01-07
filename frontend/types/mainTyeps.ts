export type NewsCard = {
  id: number;
  url: string;
  title: string;
  description: string;
  category: string;
  pubData: Date;
  keywords: string[];
  isScreenShot: boolean;
};

export type Ranking = {
  rankinData: {
    id: number;
    title: string;
    views: number;
  }[];
};
