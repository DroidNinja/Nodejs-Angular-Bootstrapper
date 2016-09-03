'use strict';

module.exports = function(sequelize, DataTypes) {

	var Article = sequelize.define('Article', {
			title: DataTypes.STRING,
			content: DataTypes.TEXT
		},
		{
			tableName: 'article',
			freezeTableName: true,
			associate: function(models){
				Article.belongsTo(models.User);
			}
		}
	);

	return Article;
};
