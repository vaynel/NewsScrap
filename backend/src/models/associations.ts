import News from './News';
import Keyword from './Keywords';
import NewsKeyword from './NewsKeywords';
import { sequelize } from '../config/database';

// // 모든 모델 초기화
// News.initModel(sequelize);
// Keyword.initModel(sequelize);
// NewsKeyword.initModel(sequelize);

// // 모델 간 관계 설정
// News.belongsToMany(Keyword, { through: NewsKeyword, foreignKey: 'newsId' });
// Keyword.belongsToMany(News, { through: NewsKeyword, foreignKey: 'keywordId' });
// 다대다 관계 정의 (중간 테이블은 'NewsKeywords'로 자동 생성됨)
News.belongsToMany(Keyword, { through: 'NewsKeywords', as: 'keywords' });
Keyword.belongsToMany(News, { through: 'NewsKeywords', as: 'news' });

// 모델 및 관계를 내보냄
export { News, Keyword, NewsKeyword, sequelize };
