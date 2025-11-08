import express, { Request, Response, Router } from 'express'
import { supabaseAdmin } from '../lib/supabase.js'

const router: Router = express.Router()

// GET /api/admin/stats - Get statistics
router.get('/', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabaseAdmin.from('numbers').select('*')

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch numbers',
      })
    }

    const totalCount = data?.length || 0
    const activeCount =
      data?.filter(item => item.status === 'active').length || 0
    const inactiveCount =
      data?.filter(item => item.status === 'inactive').length || 0

    const stats = {
      totalCount,
      activeCount,
      inactiveCount,
    }

    res.json({
      success: true,
      data: stats,
    })
  } catch (error) {
    console.error('API error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    })
  }
})

export default router
