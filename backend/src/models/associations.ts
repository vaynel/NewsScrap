import News from './News';
import Keyword from './Keywords';
import NewsKeyword from './NewsKeywords';
import { sequelize } from '../config/database';

// // 모든 모델 초기화
// News.initModel(sequelize);
// Keyword.initModel(sequelize);
// NewsKeyword.initModel(sequelize);

// 모델 간 관계 설정
News.belongsToMany(Keyword, { through: NewsKeyword, foreignKey: 'newsId' });
Keyword.belongsToMany(News, { through: NewsKeyword, foreignKey: 'keywordId' });

// 모델 및 관계를 내보냄
export { News, Keyword, NewsKeyword, sequelize };
