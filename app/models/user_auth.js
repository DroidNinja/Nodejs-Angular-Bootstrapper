'use strict';

module.exports = function(sequelize, DataTypes) {
  var UserAuth =  sequelize.define('UserAuth', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    provider: {
        type: DataTypes.ENUM('EMAIL','FACEBOOK','GOOGLE'),
        allowNull: false,
        defaultValue: 'EMAIL'
    },
    providerEmail:{
      type: DataTypes.STRING,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    isActive: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'user_auth',
    freezeTableName: true,

    associate: function(models){
      UserAuth.belongsTo(models.User);
    }
  });
  return UserAuth;
};
