import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface AssetAttributes {
  id: number;
  name: string;
  hostname: string;
  type: string;
  status: string;
  ipAddress: string;
  description?: string;
  location?: string;
  ownerId?: number;
  specifications?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}

type AssetCreationAttributes = Optional<AssetAttributes, 'id' | 'createdAt' | 'updatedAt'>;

class Asset extends Model<AssetAttributes, AssetCreationAttributes> implements AssetAttributes {
  public id!: number;
  public name!: string;
  public hostname!: string;
  public type!: string;
  public status!: string;
  public ipAddress!: string;
  public description!: string;
  public location!: string;
  public ownerId!: number;
  public specifications!: Record<string, any>;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Asset.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  hostname: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  type: {
    type: DataTypes.ENUM('server', 'workstation', 'laptop', 'switch', 'router', 'firewall', 'printer', 'other'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'maintenance', 'retired'),
    defaultValue: 'active',
  },
  ipAddress: {
    type: DataTypes.STRING(45),
    allowNull: false,
    validate: {
      isIP: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
  },
  location: {
    type: DataTypes.STRING(255),
  },
  ownerId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  specifications: {
    type: DataTypes.JSON,
    allowNull: true,
  },
}, {
  tableName: 'assets',
  sequelize,
});

export { Asset };