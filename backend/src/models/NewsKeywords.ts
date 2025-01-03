import { Model } from 'sequelize';
import { sequelize } from '../config/database';

export class NewsKeyword extends Model {}

NewsKeyword.init(
  {},
  {
    sequelize,
    tableName: 'news_keywords',
    timestamps: false, // 중간 테이블에는 시간 정보가 필요하지 않음
  },
);

export default NewsKeyword;
