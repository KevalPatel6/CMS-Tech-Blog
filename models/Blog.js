const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Blog extends Model {

}


Blog.init(

    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        blog_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        blog_content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_posted: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true,
            }
        },
         
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog',
      
    }
)

module.exports = Blog