import { DataTypes, Model } from "sequelize";
import sequelize from "../modules/Database";

import { User } from "./m.User";
import { ModelBase } from "./m.ModelBase";

class Budget extends Model {}

Budget.init(
  {
    ...ModelBase,
    type: {
      type: DataTypes.ENUM,
      values: ["actual", "projected"],
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.STRING,
      references: "user",
      key: "id",
    },
  },
  {
    sequelize,
    modelName: "budget",
  }
);

Budget.belongsTo(User);

export { Budget };
