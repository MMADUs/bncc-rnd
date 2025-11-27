import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import router from "./src/router.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000

const corsOpt = {
  origin: process.env.ORIGIN || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization']
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOpt))

app.use("/api", router)

const server = app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received, closing server');
  server.close(() => {
    console.log('server closed');
    process.exit(0);
  });
});