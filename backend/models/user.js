const { DataTypes } = require("sequelize");
const sequelize = require("../dbconfig/dbconnect");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isValidUsername(value) {
          if (
            typeof value !== "string" ||
            value.length < 2 ||
            value.length > 50
          ) {
            throw new Error(
              "Username must be a valid string between 2 and 50 characters"
            );
          }
        },
      },
    },
    interest: {
      type: DataTypes.STRING, // Sequelize doesn't directly support arrays, so store as JSON
      get() {
        const rawValue = this.getDataValue("interest");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue("interest", JSON.stringify(value));
      },
      allowNull: true,
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        isValidAge(value) {
          if (!Number.isInteger(value) || value <= 0 || value >= 150) {
            throw new Error(
              "Age must be an integer, not a negative number, and less than 150"
            );
          }
        },
      },
    },
    mobile: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        isValidMobile(value) {
          if (typeof value !== "number" || value.toString().length !== 10) {
            throw new Error("Mobile must be valid 10-digit long number");
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isValidEmail(value) {
          const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
          if (!emailRegex.test(value)) {
            throw new Error(
              "Email must be a valid format (e.g., user@domain.com)"
            );
          }
        },
      },
    },
  },
  {
    tableName: "user",
    timestamps: true,
    createdAt: "created_date",
    updatedAt: "modified_date",
  }
);

module.exports = User;
