import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../redux/cartSlice'
import { useNavigate } from 'react-router-dom'

const PaymentScreen = () => {
	const cart = useSelector((state) => state.cart)
	const { shippingAddress } = cart
	const navigate = useNavigate()
	if (!shippingAddress) {
		navigate('/shipping')
	}
	const [paymentMethod, setPaymentMethod] = useState('Thanh toán bằng tiền mặt')

	const dispatch = useDispatch()

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(savePaymentMethod(paymentMethod))
		navigate('/placeorder')
	}

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Phương thức thanh toán</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as='legend'>Lựa chọn phương thức</Form.Label>
					<Col>
						<Form.Check
							type='radio'
							label='Thanh toán bằng tiền mặt'
							id='Thanh toán bằng tiền mặt'
							name='paymentMethod'
							value='Thanh toán bằng tiền mặt'
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
					</Col>
				</Form.Group>
				<Button type='submit' variant='primary'>
					Tiếp tục
				</Button>
			</Form>
		</FormContainer>
	)
}

export default PaymentScreen
