import asyncHandler from '../middleware/asyncHandler.js'

// @docs    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  res.send('Order created')
})

// @docs    Get Logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOders = asyncHandler(async (req, res) => {
  res.send('get My Order Items')
})

// @docs    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  res.send('get Order by ID')
})
