const { Project, User } = require('../models');

// Get semua projects
exports.index = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: { projects },
      count: projects.length
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
};

// Get project by ID
exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    
    const project = await Project.findByPk(id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }]
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project tidak ditemukan'
      });
    }

    res.json({
      success: true,
      data: { project }
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
};

// Create project baru
exports.store = async (req, res) => {
  try {
    const { title, description, url, url_demo, url_github, tech_stack, image_url } = req.body;

    // Validasi
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title dan description harus diisi'
      });
    }

    const project = await Project.create({
      title,
      description,
      url,
      url_demo,
      url_github,
      tech_stack,
      image_url,
      user_id: req.user.id // Dari middleware auth
    });

    res.status(201).json({
      success: true,
      message: 'Project berhasil dibuat',
      data: { project }
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
};

// Update project
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, url, url_demo, url_github, tech_stack, image_url } = req.body;

    const project = await Project.findByPk(id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project tidak ditemukan'
      });
    }

    // Cek apakah user yang update adalah pemilik project
    if (project.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Anda tidak memiliki akses untuk mengupdate project ini'
      });
    }

    await project.update({
      title: title || project.title,
      description: description || project.description,
      url: url || project.url,
      url_demo: url_demo || project.url_demo,
      url_github: url_github || project.url_github,
      tech_stack: tech_stack || project.tech_stack,
      image_url: image_url || project.image_url
    });

    res.json({
      success: true,
      message: 'Project berhasil diupdate',
      data: { project }
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
};

// Delete project
exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project tidak ditemukan'
      });
    }

    // Cek apakah user yang delete adalah pemilik project atau admin
    if (project.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Anda tidak memiliki akses untuk menghapus project ini'
      });
    }

    await project.destroy();

    res.json({
      success: true,
      message: 'Project berhasil dihapus'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
};