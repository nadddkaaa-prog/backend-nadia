'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    static associate(models) {
      // Relasi sudah diatur di index.js
    }
  }
  
  Skill.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Nama skill harus diisi' }
      }
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
        isInt: { msg: 'Level harus berupa angka' }
      },
      comment: 'Level keahlian 0-100'
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Kategori skill (Frontend, Backend, Database, dll)'
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: 'Path atau URL icon skill'
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      field: 'user_id'
    }
  }, {
    sequelize,
    modelName: 'Skill',
    tableName: 'Skills',
    timestamps: true,
    
  });
  
  return Skill;
};