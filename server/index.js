import express from 'express'
import sequelize from './service/connection.js';
import router from './routers/route.js';
import dotenv from 'dotenv';
import cors from 'cors'


const app = express()
app.use(express.json());
dotenv.config()

const port = process.env.DB_PORT || 3000

app.use(
    cors({
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true, 
    })
  );

app.use('/', router)


sequelize.sync()
  .then(() => console.log('Database synchronized'))
  .catch((err) => console.error("Database sync error:", err));

app.listen(port, () => {
  console.log('Server is running on port 3000')
})