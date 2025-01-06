import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import Keyword from './Keywords';

interface NewsAttributes {
  id: number;
  title: string;
  category: string;
  description: string;
  url: string;
  pubDate: Date;
  isScreenShot: boolean;
}

export interface NaverNews {
  id: number;
  title: string;
  category: string;
  description: string;
  link: string;
  pubDate: Date;
  isScreenShot: boolean;
}

interface NewsCreationAttributes extends Optional<NewsAttributes, 'id'> {}

export class News
  extends Model<NewsAttributes, NewsCreationAttributes>
  implements NewsAttributes
{
  public id!: number;
  public title!: string;
  public category!: string;
  public description!: string;
  public url!: string;
  public pubDate!: Date;
  public isScreenShot!: boolean;

  // 관계 메서드 타입 정의
  public addKeywords!: (keywords: Keyword[]) => Promise<void>;
  public getKeywords!: () => Promise<Keyword[]>;
  public setKeywords!: (keywords: Keyword[]) => Promise<void>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
News.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    pubDate: {
      type: DataTypes.DATE,
    },
    isScreenShot: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    tableName: 'news',
    timestamps: true,
  },
);

// Keyword 모델과의 관계 정의
News.belongsToMany(Keyword, { through: 'NewsKeywords', as: 'keywords' });
Keyword.belongsToMany(News, { through: 'NewsKeywords', as: 'news' });

export default News;
