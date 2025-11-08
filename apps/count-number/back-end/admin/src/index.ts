import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { config } from 'dotenv'

// Import routes
import numbersRouter from './routes/numbers.js'
import statsRouter from './routes/stats.js'

// Load environment variables
config()

const app = express()
const PORT = process.env.PORT || 3011

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API routes
app.use('/api/admin/numbers', numbersRouter)
app.use('/api/admin/stats', statsRouter)

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' })
})

// Global error handler
app.use((err: any, req, res) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ success: false, error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`🔢 Numbers API: http://localhost:${PORT}/api/admin/numbers`)
  console.log(`📈 Stats API: http://localhost:${PORT}/api/admin/stats`)
})
