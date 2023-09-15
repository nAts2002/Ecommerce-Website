import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listMyOrders } from '../redux/orderSlice'


const ProfileScreen = () => {	
	const dispatch = useDispatch()

	const {orders} = useSelector((state) => state.order)

	useEffect(() => {	
		dispatch(listMyOrders())
	}, [dispatch])


	return (
		<Row>
			<Col md={9}>
				
				<h2>My orders</h2>
				<Table bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>Date</th>
								<th>Total</th>
								<th>Paid</th>
								<th>Delivered</th>
								<th>Info</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>R{order.totalPrice}</td>
									<td>
										{order.isPaid ? (
											order.paidAt.substring(0, 10)
										) : (
											<i className='fas fa-times' style={{ color: 'red' }}></i>
										)}
									</td>
									<td>
										{order.isDeliverd ? (
											order.deliveredAt.substring(0, 10)
										) : (
											<i className='fas fa-times' style={{ color: 'red' }}></i>
										)}
									</td>
									<td>
										<LinkContainer to={`/order/${order._id}`}>
											<Button className='btn-sm' variant='light'>
												Details
											</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
			</Col>
		</Row>
	)
}

export default ProfileScreen
