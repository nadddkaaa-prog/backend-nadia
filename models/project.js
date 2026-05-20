'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      // Relasi sudah diatur di index.js
    }
  }
  
  Project.init({
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Judul project harus diisi' }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Deskripsi harus diisi' }
      }
    },
    url: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    url_demo: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    url_github: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    tech_stack: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Teknologi yang digunakan (comma separated)'
    },
    image_url: {
      type: DataTypes.STRING(500),
      allowNull: true
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
    modelName: 'Project',
    tableName: 'Projects',
    timestamps: true,
  });
  
  return Project;
};