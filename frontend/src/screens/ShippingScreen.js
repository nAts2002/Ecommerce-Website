import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../redux/cartSlice'
import { useNavigate } from 'react-router-dom'

const ShippingScreen = ({}) => {
	const navigate = useNavigate()
	const cart = useSelector((state) => state.cart)
	const { shippingAddress } = cart

	const [address, setAddress] = useState(shippingAddress.address)
	const [city, setCity] = useState(shippingAddress.city)
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
	const [country, setCountry] = useState(shippingAddress.country)

	const dispatch = useDispatch()

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(saveShippingAddress({ address, city, country }))
		navigate('/payment')
	}

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<h1>Địa chỉ nhận hàng</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='address'>
					<Form.Label>Địa chỉ</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter address'
						value={address}
						required
						onChange={(e) => setAddress(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='city'>
					<Form.Label>Thành phố</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter city'
						value={city}
						required
						onChange={(e) => setCity(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='country'>
					<Form.Label>Quốc gia</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter country'
						value={country}
						required
						onChange={(e) => setCountry(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Button type='submit' variant='primary'>
					Tiếp tục
				</Button>
			</Form>
		</FormContainer>
	)
}

export default ShippingScreen
