const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRouter);

sequelize.authenticate()
  .then(() => console.log('✅ DB Connected'))
  .catch(err => console.log('❌ DB Error:', err));

sequelize.sync();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
