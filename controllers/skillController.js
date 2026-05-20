const { Skill, User } = require('../models');

// Get semua skills
exports.index = async (req, res) => {
  try {
    const skills = await Skill.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }],
      order: [['level', 'DESC']]
    });

    res.json({
      success: true,
      data: { skills },
      count: skills.length
    });
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
};

// Get skill by ID
exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    
    const skill = await Skill.findByPk(id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }]
    });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill tidak ditemukan'
      });
    }

    res.json({
      success: true,
      data: { skill }
    });
  } catch (error) {
    console.error('Get skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
};

// Create skill baru
exports.store = async (req, res) => {
  try {
    const { name, level, category, icon } = req.body;

    // Validasi
    if (!name || !level) {
      return res.status(400).json({
        success: false,
        message: 'Name dan level harus diisi'
      });
    }

    if (level < 0 || level > 100) {
      return res.status(400).json({
        success: false,
        message: 'Level harus antara 0-100'
      });
    }

    const skill = await Skill.create({
      name,
      level,
      category,
      icon,
      user_id: req.user.id // Dari middleware auth
    });

    res.status(201).json({
      success: true,
      message: 'Skill berhasil dibuat',
      data: { skill }
    });
  } catch (error) {
    console.error('Create skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
};

// Update skill
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, level, category, icon } = req.body;

    const skill = await Skill.findByPk(id);
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill tidak ditemukan'
      });
    }

    // Cek apakah user yang update adalah pemilik skill atau admin
    if (skill.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Anda tidak memiliki akses untuk mengupdate skill ini'
      });
    }

    await skill.update({
      name: name || skill.name,
      level: level !== undefined ? level : skill.level,
      category: category || skill.category,
      icon: icon || skill.icon
    });

    res.json({
      success: true,
      message: 'Skill berhasil diupdate',
      data: { skill }
    });
  } catch (error) {
    console.error('Update skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
};

// Delete skill
exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findByPk(id);
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill tidak ditemukan'
      });
    }

    // Cek apakah user yang delete adalah pemilik skill atau admin
    if (skill.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Anda tidak memiliki akses untuk menghapus skill ini'
      });
    }

    await skill.destroy();

    res.json({
      success: true,
      message: 'Skill berhasil dihapus'
    });
  } catch (error) {
    console.error('Delete skill error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
};