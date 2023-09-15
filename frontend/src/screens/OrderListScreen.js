import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../redux/orderSlice'
import { useNavigate } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'

const OrderListScreen = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const orderList = useSelector((state) => state.order)
	const { loading, error, orders } = orderList

	const userLogin = useSelector((state) => state.user)
	const { userInfo } = userLogin

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listOrders())
		} else {
			navigate('/login')
		}
	}, [dispatch, userInfo, navigate])

	return (
		<>
			<h1>Orders</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>User</th>
							<th>Date</th>
							<th>Total</th>
							<th>Info</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.user && order.user.name}</td>
								<td>{order.createdAt.substring(0, 10)}</td>
								<td>{order.totalPrice} VND</td>	
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
			)}
		</>
	)
}

export default OrderListScreen
