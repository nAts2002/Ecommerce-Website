import asyncHandler from 'express-async-handler'
import Order from '../Models/OrderModel.js'

// POST /api/orders
const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		user,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body
	if (orderItems && orderItems.length === 0) {
		res.status(400)
		throw new Error('No order items')
		return
	} else {
		const order = new Order({
			orderItems,
			user,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		})
		const createdOrder = await order.save()
		res.status(201).json(createdOrder)
	}
})
// GET /api/orders/:id
const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)

	if (order) {
		res.json(order)
	} else {
		res.status(404)
		throw new Error('Order not found')
	}
})
// PUT /api/orders/:id/pay
const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)

	if (order) {
		order.isPaid = true
		order.paidAt = Date.now()
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		}

		const updatedOrder = await order.save()
		res.json(updatedOrder)
	} else {
		res.status(404)
		throw new Error('Order not found')
	}
})
// GET /api/orders/myorders
const getMyOrders = asyncHandler(async (req, res) => {	
	const orders = await Order.find({ user: req.params.id})
	res.json(orders)
})
// GET /api/orders
const getOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({}).populate('user', 'id name')
	res.json(orders)
})
// PUT /api/orders/:id/deliver
const updateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)

	if (order) {
		order.isDelivered = true
		order.deliveredAt = Date.now()

		const updatedOrder = await order.save()
		res.json(updatedOrder)
	} else {
		res.status(404)
		throw new Error('Order not found')
	}
})

export {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	getMyOrders,
	getOrders,
	updateOrderToDelivered,
}
