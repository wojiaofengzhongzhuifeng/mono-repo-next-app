import express, { Request, Response, Router } from 'express'
import { supabaseAdmin } from '../lib/supabase.js'

const router: Router = express.Router()

// GET /api/admin/numbers - Get all numbers
router.get('/', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('numbers')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch numbers',
      })
    }

    res.json({
      success: true,
      data: data || [],
    })
  } catch (error) {
    console.error('API error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    })
  }
})

// POST /api/admin/numbers - Create new number
router.post('/', async (req: Request, res: Response) => {
  try {
    const { value, label, description, status } = req.body

    if (!value || !label) {
      return res.status(400).json({
        success: false,
        error: 'Value and label are required',
      })
    }

    const { data, error } = await supabaseAdmin
      .from('numbers')
      .insert([
        {
          value,
          label,
          description,
          status: status || 'active',
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({
        success: false,
        error: 'Failed to create number',
        details: error.message,
      })
    }

    res.status(201).json({
      success: true,
      data,
      message: 'Number created successfully',
    })
  } catch (error) {
    console.error('API error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    })
  }
})

// GET /api/admin/numbers/:id - Get single number
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { data, error } = await supabaseAdmin
      .from('numbers')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return res.status(404).json({
        success: false,
        error: 'Number not found',
      })
    }

    res.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error('API error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    })
  }
})

// PUT /api/admin/numbers/:id - Update number
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updateData = req.body

    const { data, error } = await supabaseAdmin
      .from('numbers')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({
        success: false,
        error: 'Failed to update number',
        details: error.message,
      })
    }

    res.json({
      success: true,
      data,
      message: 'Number updated successfully',
    })
  } catch (error) {
    console.error('API error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    })
  }
})

// DELETE /api/admin/numbers/:id - Delete number
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { error } = await supabaseAdmin.from('numbers').delete().eq('id', id)

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({
        success: false,
        error: 'Failed to delete number',
      })
    }

    res.json({
      success: true,
      data: null,
      message: 'Number deleted successfully',
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
