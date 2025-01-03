export type NewsCard = {
  id: number;
  url: string;
  title: string;
  description: string;
  categary: string;
  pubData: Date;
  keywords: string[];
};

export type Ranking = {
  rankinData: {
    id: number;
    title: string;
    views: number;
  }[];
};
