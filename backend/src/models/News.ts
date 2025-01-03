import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import Keyword from './Keywords';

interface NewsAttributes {
  id: number;
  title: string;
  category: string;
  description: string;
  url: string;
  pubData: Date;
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
  public pubData!: Date;

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
    pubData: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: 'news',
    timestamps: true,
  },
);

export default News;
