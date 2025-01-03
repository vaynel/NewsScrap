import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface KeywordAttributes {
  id: number;
  keyword: string;
}

interface KeywordCreationAttributes extends Optional<KeywordAttributes, 'id'> {}

export class Keyword
  extends Model<KeywordAttributes, KeywordCreationAttributes>
  implements KeywordAttributes
{
  public id!: number;
  public keyword!: string;
}

Keyword.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    keyword: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true, // 중복 방지
    },
  },
  {
    sequelize,
    tableName: 'keywords',
    timestamps: false, // 키워드에는 시간 정보가 필요하지 않음
  },
);

export default Keyword;
