import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../redux/productSlice'

const ProductCarousel = () => {
	const dispatch = useDispatch()
	const productTopRated = useSelector((state) => state.product)
	const { loading, error, topProducts } = productTopRated
	useEffect(
		() => {
			dispatch(listTopProducts())
		},
		[dispatch]
	)

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<Carousel pause='hover' className='bg-light'>
			{topProducts.map((product) => (
				<Carousel.Item key={product._id} interval={2000}>
					<Link to={`/product/${product._id}`}>
						<Image src={product.image} alt={product.name} fluid />
						<Carousel.Caption className='carousel-caption' style={{color: 'black'}}>
							<h2>
								{product.name} ({product.price.toLocaleString('en-US')} VND)
							</h2>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	)
}

export default ProductCarousel
