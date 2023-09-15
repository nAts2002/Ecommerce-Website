import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
	getOrderDetails,
	payOrder,
	deliverOrder,
} from '../redux/orderSlice'


const OrderScreen = () => {

	const  orderId  = useParams().id

	const dispatch = useDispatch()

	const orderDetails = useSelector((state) => state.order)
	const { order, loading, error, successDeliver, successPay } = orderDetails


	const userLogin = useSelector((state) => state.user)
	const { userInfo } = userLogin

	

	useEffect(() => {

			dispatch(getOrderDetails(orderId))
		
	}, [dispatch, successDeliver])

	const successPaymentHandler = (paymentResult) => {
		dispatch(payOrder(orderId, paymentResult))
	}

	const deliverHandler = () => {
		dispatch(deliverOrder(order))
	}

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<>
			<Link
				to={userInfo.isAdmin ? '/admin/orderlist' : '/profile'}
				className='btn btn-light my-3'
			>
				Go Back
			</Link>
			<h1>Order {order._id}</h1>
			<Row>
				{/* Left Steps Summary */}
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Vận chuyển</h2>

							<p>
								<span className='push-to-right'>
									<strong>Tên: </strong> {userInfo.name}
								</span>
							</p>

							<p>
								<span className='push-to-right'>
									<strong>Email: </strong>
									<a href={`mailto:${userInfo.email}`}>{userInfo.email}</a>
								</span>
							</p>

							<p>
								<span className='push-to-right'>
									<strong>Địa chỉ: </strong>
									{order.shippingAddress.address}, {order.shippingAddress.city}{' '}
									{order.shippingAddress.country}
								</span>
							</p>
							{order.isDelivered ? (
								<Message variant='success'>
									Đã vận chuyển vào {order.deliveredAt}
								</Message>
							) : (
								<Message variant='danger'>Chưa vận chuyển</Message>
								
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Phương thức thanh toán</h2>
							<p>
								<span className='push-to-right'>
									<strong>Phương thức: </strong>
									{order.paymentMethod}
								</span>
							</p>
							{order.isPaid ? (
								<Message variant='success'>Paid on {order.paidAt}</Message>
							) : (
								<Message variant='danger'>Chưa thanh toán	</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Sản phẩm</h2>
							{order.orderItems.length === 0 ? (
								<Message>Your order is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{order.orderItems.map((item, index) => (
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
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Tóm tắt đơn hàng</h2>
							</ListGroup.Item>
							<ListGroup.Item className='push-to-right'>
								<Row>
									<Col>Tổng giá trị sản phẩm</Col>
									<Col>{order.itemsPrice} VND</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item className='push-to-right'>
								<Row>
									<Col>Phí vận chuyển</Col>
									<Col>{order.shippingPrice} VND</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item className='push-to-right'>
								<Row>
									<Col>Thuế</Col>
									<Col>{order.taxPrice} VND</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item className='push-to-right'>
								<Row>
									<Col>
										<strong>Tổng cộng</strong>
									</Col>
									<Col>
										<strong>{order.totalPrice} VND</strong>
									</Col>
								</Row>
							</ListGroup.Item>
							{loading && <Loader />}
							{userInfo.isAdmin && !order.isDelivered && (
								<ListGroup.Item>
									<Button
										type='button'
										className='btn btn-block'
										onClick={deliverHandler}
									>
										Đánh dấu là đã giao
									</Button>
								</ListGroup.Item>
							)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default OrderScreen
