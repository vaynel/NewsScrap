import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

interface UserAttributes {
  id?: number;
  username: string;
  email: string;
  kakaoId?: string;
  githubId?: string;
  googleId?: string;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public kakaoId?: string; // 선택적
  public githubId?: string; // 선택적
  public googleId?: string; // 선택적
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    kakaoId: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: true, // 선택적
    },
    githubId: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: true, // 선택적
    },
    googleId: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: true, // 선택적
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true, // true로 설정하면 createdAt과 updatedAt 컬럼 자동 추가
  }
);

export default User;
