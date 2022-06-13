import { DataTypes, Sequelize } from "sequelize";

export const ModelBase = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
};
