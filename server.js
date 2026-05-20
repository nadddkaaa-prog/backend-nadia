require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

// Catatan: Baris 'sesuatu' dan './projek backend/index.js' sudah dihapus karena tidak diperlukan

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes (Sudah diperbaiki jalurnya agar tidak pakai nama folder proyek)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));

// Home Route
app.get('/', (req, res) => {
  res.json({
    message: '✅ API BACKEND BERHASIL BERJALAN',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      projects: '/api/project',
      skills: '/api/skill'
    }
  });
});

// Start Server
const PORT = process.env.PORT || 3000;

// Pastikan kamu sudah meng-import 'sequelize' di bagian atas jika menggunakan DB, 
// jika belum dan dapet error "sequelize is not defined", pastikan config db-mu sudah di-require.
sequelize.authenticate()
  .then(() => {
    console.log('🗄️ Database Terhubung!');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server Berjalan di http://localhost:${PORT}`);
      console.log(`📚 API Docs: http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });