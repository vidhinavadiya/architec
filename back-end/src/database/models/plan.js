'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    Plan.hasMany(models.PlanSection, {
      foreignKey: 'plan_id',
      as: 'sections'
    });
    }
  }
  Plan.init({
    subcategory_id: DataTypes.INTEGER,
    icon: DataTypes.STRING,
    title: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    year: DataTypes.INTEGER,
    slug: DataTypes.STRING,
    typology: DataTypes.STRING,
    size: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Plan',
    tableName: 'plans',
    timestamps: true
  });
  return Plan;
};