import asyncHandler from '../middleware/asyncHandler.js'

// @docs    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  res.send('Order created')
})
