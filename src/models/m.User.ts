import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../modules/Database";

import { ModelBase } from "./m.ModelBase";

type UserAttributes = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type UserCreationAttributes = Optional<UserAttributes, "id">;

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: string;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
}

User.init(
  {
    ...ModelBase,
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);

export { User };
