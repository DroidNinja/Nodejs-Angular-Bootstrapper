'use strict';

/**
	* User Model
	*/

var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {

	var User = sequelize.define('User', 
		{
			id: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: false
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: ''
			},
			displayName: {
				type: DataTypes.STRING,
				allowNull: true
			},
			primaryEmail:{
				type: DataTypes.STRING,
				allowNull: false
			},
			gender: {
				type: DataTypes.ENUM('Female','Male','Other'),
				allowNull: false,
				defaultValue: 'Other'
			},
			pictureUrl: {
				type: DataTypes.STRING,
				allowNull: true
			},
			hashedPassword: {
				type: DataTypes.STRING,
				allowNull: true
			},
			salt: {
				type: DataTypes.STRING,
				allowNull: true
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW
			},
			isVerified: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: '0'
			},
			isActive: {
				type: DataTypes.INTEGER(4),
				allowNull: false,
				defaultValue: '1'
			}
		},
		{
			tableName: 'user',
			freezeTableName: true,
			instanceMethods: {
				toJSON: function () {
					var values = this.get();
					delete values.hashedPassword;
					delete values.salt;
					return values;
				},
				makeSalt: function() {
					return crypto.randomBytes(16).toString('base64'); 
				},
				authenticate: function(plainText){
					return this.encryptPassword(plainText, this.salt) === this.hashedPassword;
				},
				encryptPassword: function(password, salt) {
					if (!password || !salt) {
                        return '';
                    }
					salt = new Buffer(salt, 'base64');
					return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
				}
			},
			associate: function(models) {
				User.hasMany(models.Article);
				User.hasMany(models.UserAuth);
			}
		}
	);

	return User;
};
