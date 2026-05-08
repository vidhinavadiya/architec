'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlanSection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    PlanSection.belongsTo(models.Plan, {
      foreignKey: 'plan_id'
    });
    }
  }
  PlanSection.init({
    plan_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    content: DataTypes.TEXT,
    order_no: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PlanSection',
    tableName: 'plansections',
    timestamps: true
  });
  return PlanSection;
};