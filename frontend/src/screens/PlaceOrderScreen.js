import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../redux/orderSlice'



const PlaceOrderScreen = ({}) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {cartItems, shippingAddress, paymentMethod} = useSelector(state => state.cart)
	const userInfo = useSelector((state) => state.user.userInfo)
	const { _id } = userInfo
	console.log(_id)
	// Calculate prices
	// Add two decimals to price if needed
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2)
	}

	const itemsPrice = addDecimals(
		cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	)
	const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100)
	const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)))
	const totalPrice= (
		Number(itemsPrice) +
		Number(shippingPrice) +
		Number(taxPrice)
	).toFixed(2)

	const order = useSelector((state) => state.order.order)
	const { successCreate, error } = order
	
	useEffect(() => {
		if (successCreate) {
			console.log(order)
			navigate(`/order/${order.order._id}`)
			dispatch({ type: 'USER_DETAILS_RESET' })
			dispatch({ type: 'ORDER_CREATE_RESET' })
		}
		// eslint-disable-next-line
	}, [ successCreate]) // Dependencies, on change they fire off useEffect

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cartItems,
				user: _id,
				shippingAddress: shippingAddress,
				paymentMethod: paymentMethod,
				itemsPrice: itemsPrice,
				shippingPrice: shippingPrice,
				taxPrice: taxPrice,
				totalPrice: totalPrice,
			})
		)
	}

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				{/* Left Steps Summary */}
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Địa chỉ nhận hàng</h2>
							<p>
								<span className='push-to-right'>
									<strong>Địa chỉ: </strong>
									{shippingAddress.address}, {shippingAddress.city}{' '}
									{shippingAddress.country}
								</span>
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Phương thức thanh toán</h2>
							<span className='push-to-right'>
								<strong>Phương thức: </strong>
								{paymentMethod}
							</span>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Sản phẩm</h2>
							{cartItems.length === 0 ? (
								<Message>Giỏ hàng trống</Message>
							) : (
								<ListGroup variant='flush'>
									{cartItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} x {item.price} VND = {item.qty * item.price} VND
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				{/* Right Order Summary */}
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Tóm tắt đơn hàng</h2>
							</ListGroup.Item>
							<ListGroup.Item className='push-to-right'>
								<Row>
									<Col>Tổng giá trị sản phẩm</Col>
									<Col>{itemsPrice} VND</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item className='push-to-right'>
								<Row>
									<Col>Phí vận chuyển</Col>
									<Col>{shippingPrice} VND</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item className='push-to-right'>
								<Row>
									<Col>Thuế</Col>
									<Col>{taxPrice} VND</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item className='push-to-right'>
								<Row>
									<Col>
										<strong>Tổng cộng</strong>
									</Col>
									<Col>
										<strong>{totalPrice} VND</strong>
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								{error && <Message variant='danger'>{error}</Message>}
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type='button'
									className='btn-block'
									disabled={cartItems === 0}
									onClick={placeOrderHandler}
								>
									Đặt hàng
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default PlaceOrderScreen
