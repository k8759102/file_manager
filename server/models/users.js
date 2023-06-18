// const { DataTypes } = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    UserID: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    LoginID: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "LoginID는 E-Mail 로 관리합니다. ",
      unique: "UIX_Users"
    },
    Password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    CreateUserID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    CreateDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    UpdateUserID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    UpdateDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "UserID" },
        ]
      },
      {
        name: "UIX_Users",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "LoginID" },
        ]
      },
    ]
  });
};
