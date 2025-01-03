import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // .env 로드

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_DIALECT
} = process.env;

if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME || !DB_DIALECT) {
  throw new Error('DB 환경변수(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_DIALECT)가 설정되지 않았습니다.');
}

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT as any, // MySQL, MariaDB, etc.
  logging: false,
});
