'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // Method untuk compare password saat login
    async comparePassword(inputPassword) {
      return bcrypt.compare(inputPassword, this.password);
    }
  }
  
  User.init({
    name: {
      type: DataTypes.STRING(100),
      field: 'username',
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Nama harus diisi' },
        len: { args: [3, 100], msg: 'Nama minimal 3 karakter' }
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: 'Email harus diisi' },
        isEmail: { msg: 'Format email tidak valid' }
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Password harus diisi' },
        len: { args: [6, 255], msg: 'Password minimal 6 karakter' }
      }
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
      defaultValue: 'user'
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true,
    hooks: {
      // Hash password sebelum create user baru
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      // Hash password saat update (jika password berubah)
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  });
  
  return User;
};