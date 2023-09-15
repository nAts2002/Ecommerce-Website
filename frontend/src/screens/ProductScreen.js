import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {
	listProductDetails,
	createProductReview,
} from '../redux/productSlice'

const ProductScreen = () => {
	const [qty, setQty] = useState(1)

	const [rating, setRating] = useState(0)
	const [comment, setComment] = useState('')

	const dispatch = useDispatch()

	const productDetails = useSelector((state) => state.product)
	const { loading, error, product } = productDetails

	const userInfo = useSelector((state) => state.user.userInfo)
  
	const productReviewCreate = useSelector((state) => state.productReviewCreate)
	const {
		success: successProductReview,
		loading: loadingProductReview,
		error: errorProductReview,
	} = productReviewCreate

    const productId = useParams().id
    const navigate = useNavigate()
	useEffect(
		() => {
			if (successProductReview) {
				console.log('Review Submitted!')
				setRating(0)
				setComment('')
				dispatch(listProductDetails(productId))
				dispatch({ type: 'PRODUCT_CREATE_REVIEW_RESET' })
			}
			// Fire off action to get a single product
			if (!product._id || product._id !== productId) {
				dispatch(listProductDetails(productId))
				dispatch({ type: 'PRODUCT_CREATE_REVIEW_RESET' })
			}
		},
		[dispatch, successProductReview, productId, product._id]
	)

	const addToCartHandler = () => {
		navigate(`/cart/${productId}?qty=${qty}`)
	}

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			createProductReview(productId, {
				rating,
				comment,
			})
		)
	}

	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				Quay lại
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Meta title={product.name} />
					<Row>
						<Col md='6'>
							<Image src={product.image} alt={product.name} fluid />
						</Col>
						<Col md='3'>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h3>{product.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										value={product.rating}
										text={`${product.numReviews} reviews`}
									/>
								</ListGroup.Item>
								<ListGroup.Item>Giá thành: {product.price} VND</ListGroup.Item>
								<ListGroup.Item>
									Mô tả: {product.description}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md='3'>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<Row>
											<Col>Giá thành:</Col>
											<Col>
												<strong>{product.price} VND</strong>
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Tình trạng:</Col>
											<Col>
												{product.countInStock > 0 ? 'Còn hàng' : 'Hết hàng'}
											</Col>
										</Row>
									</ListGroup.Item>

									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Số lượng</Col>
												<Col>
													<Form.Control
														as='select'
														value={qty}
														onChange={(e) => setQty(e.target.value)}
													>
														{[...Array(product.countInStock).keys()].map(
															(x) => (
																<option key={x + 1} value={x + 1}>
																	{x + 1}
																</option>
															)
														)}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}

									<ListGroup.Item>
										{product.countInStock > 0 ? (
											<Button
												onClick={addToCartHandler}
												className='btn-block'
												type='button'
											>
												<i className='fas fa-plus'></i>
												<span className='plus-sign-margin'>
													<i className='fas fa-shopping-cart'></i>
												</span>
												Thêm vào giỏ hàng
											</Button>
										) : (
											<Button
												className='btn-block'
												type='button'
												disabled={product.countInStock === 0}
											>
												Đã bán hết
											</Button>
										)}
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<h2>Reviews</h2>
							{product.reviews.length === 0 && <Message>No Reviews</Message>}
							<ListGroup variant='flush'>
								{product.reviews.map((review) => (
									<ListGroup.Item key={review._id}>
										<strong>{review.name}</strong>
										<Rating value={review.rating} />
										<p>{review.comment}</p>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h2>Viết Review</h2>
									{successProductReview && (
										<Message variant='success'>
											Review thành công
										</Message>
									)}
									{loadingProductReview && <Loader />}
									{errorProductReview && (
										<Message variant='danger'>{errorProductReview}</Message>
									)}
									{userInfo ? (
										<Form className='push-to-right' onSubmit={submitHandler}>
											<Form.Group controlId='rating'>
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as='select'
													value={rating}
													onChange={(e) => setRating(e.target.value)}
												>
													<option value=''>Select...</option>
													<option value='1'>1 - Poor</option>
													<option value='2'>2 - Fair</option>
													<option value='3'>3 - Good</option>
													<option value='4'>4 - Very Good</option>
													<option value='5'>5 - Excellent</option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId='comment'>
												<Form.Control
													as='textarea'
													required
													row='3'
													onChange={(e) => setComment(e.target.value)}
												></Form.Control>
											</Form.Group>
											<Button
												type='submit'
												disabled={loadingProductReview}
												variant='primary'
											>
												Submit
											</Button>
										</Form>
									) : (
										<Message>
											 <Link to='/login'>Đăng nhập</Link> để có thể viết review
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	)
}

export default ProductScreen
