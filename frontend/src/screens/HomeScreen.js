import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../redux/productSlice'

const HomeScreen = () => {
	const { keyword, pageNumber = 1 } = useParams()
	const dispatch = useDispatch()
	const productList = useSelector((state) => state.product)
	const { loading, error, allProducts , page, pages } = productList
	useEffect(
		() => {
			console.log('keyword: ', keyword)
			dispatch(listProducts(keyword, 1))
		},
		[dispatch, keyword, pageNumber]
	)
	return (
		<>
			<Meta />
			{!keyword ? (
				<ProductCarousel />
			) : (
				<Link className='btn btn-light' to='/'>
					Quay lại
				</Link>
			)}
			<h1>Sản phẩm nổi bật</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Row>
					{allProducts ? (
						allProducts.map((product) => (
							<Col key={product._id} sm={12} md='6' lg={4} xl={3}>
							<Product product={product} />
							</Col>
						))
						) : (
						<div>No products found</div>
					)}
					</Row>
					<Paginate
						pages={pages}
						page={page}
						keyword={keyword ? keyword : ''}
					/>
				</>
			)}
		</>
	)
}

export default HomeScreen
