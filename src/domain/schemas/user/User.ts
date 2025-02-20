import { Model, DataTypes } from "sequelize";
import { postgresConnector } from "../../../core/utils/absoluteFilePath";

const validRoles = ["admin", "manager", "member"] as const;
type RoleType = (typeof validRoles)[number];

class UserModel extends Model {
  id!: number;
  name!: string;
  email!: string;
  role!: RoleType;
  createdAt!: Date;
  updatedAt!: Date;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 50], // Ensuring a reasonable name length
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    role: {
      type: DataTypes.ENUM(...validRoles),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: postgresConnector,
    modelName: "user",
    tableName: "user",
    timestamps: true,
    paranoid: true, // Enables soft delete
  },
);

export default UserModel;
