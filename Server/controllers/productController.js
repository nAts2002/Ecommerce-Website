import asyncHandler from 'express-async-handler'
import Product from '../Models/ProductModel.js'

//   GET /api/products
const getProducts = asyncHandler(async (req, res) => {
	const pageSize = 10
	const page = Number(req.query.pageNumber) || 1
	const keyword = req.query.keyword
		? // TODO Fuzzy Search
		  {
				name: {
					$regex: req.query.keyword,
					$options: 'i', // case insensitive
				},
		  }
		: {}

	const count = await Product.countDocuments({ ...keyword })

	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1))

	res.json({ products, page, pages: Math.ceil(count / pageSize) })
})
// GET /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)
	// Check if product exists
	if (product) {
		res.json(product)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})
// DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)
	if (product) {
		await product.deleteOne()
		res.json({ message: 'Product removed' })
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

//POST /api/products
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample name',
		price: 0,
		user: req.user._id,
		image: '/images/sample.jpg',
		brand: 'Sample brand',
		category: 'Sample category',
		countInStock: 0,
		numReviews: 0,
		description: 'Sample description',
	})

	const createdProduct = await product.save()
	res.status(201).json(createdProduct)
})
// PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		description,
		image,
		brand,
		category,
		countInStock,
	} = req.body

	const product = await Product.findById(req.params.id)
	if (product) {
		product.name = name
		product.price = price
		product.description = description || product.description
		product.image = image || product.image
		product.brand = brand || product.brand
		product.category = category || product.category
		product.countInStock = countInStock

		const updatedProduct = await product.save()
		res.status(201).json(updatedProduct)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})
// POST /api/products/:id/reviews
const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body

	const product = await Product.findById(req.params.id)
	if (product) {
		const alreadyReviewed = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		)

		if (alreadyReviewed) {
			res.status(400)
			throw new Error('Product already reviewed')
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id,
		}

		product.reviews.push(review)

		product.numReviews = product.reviews.length

		// Calculate overall average review for a product
		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length

		await product.save()
		res.status(201).json({ message: 'Review added' })
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})
// GET /api/products/top
const getTopProducts = asyncHandler(async (req, res) => {
	// Find products and sort by rating in ascending order
	const products = await Product.find({}).sort({ rating: -1 }).limit(3)

	res.json(products)
})

export {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
	getTopProducts,
}
