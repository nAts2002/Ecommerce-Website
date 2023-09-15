
import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
	listProducts,
	deleteProduct,
	createProduct,
} from '../redux/productSlice'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'


const ProductListScreen = () => {
	const pageNumber = useParams().pageNumber || 1

	const dispatch = useDispatch()

	const productState = useSelector((state) => state.product)
	const { loading, error, allProducts, page, pages, successCreate, createdProduct} = productState

	const userLogin = useSelector((state) => state.user)
	const { userInfo } = userLogin


    const navigate = useNavigate()

	useEffect(() => {
		dispatch({ type: 'PRODUCT_CREATE_RESET' })

		if (!userInfo || !userInfo.isAdmin) {
			navigate('/login')
		}
		if (successCreate) {
			navigate(`/admin/product/${createdProduct._id}/edit`)
		} else {
			dispatch(listProducts('', pageNumber))
		}
	}, [
		dispatch,
		userInfo,
		navigate,
		pageNumber,
		successCreate,
		createdProduct,
	])

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteProduct(id))
		}
	}

	const createProductHandler = () => {
        dispatch(createProduct())
    }

	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className='text-right'>
					<Button className='my-3' onClick={createProductHandler}>
						<span className='plus-sign-margin'>
							<i className='fas fa-plus'></i>
						</span>
						Create Product
					</Button>
				</Col>
			</Row>
			{loading && <Loader />}
			{error && <Message variant='danger'>{error}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Table bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Price</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{allProducts.map((product) => (
								<tr key={product._id}>
									<td>{product._id}</td>
									<td>{product.name}</td>
									<td>{product.price} VND</td>
									<td>
										<LinkContainer to={`/admin/product/${product._id}/edit`}>
											<Button variant='light' className='btn-sm'>
												<i className='fas fa-edit'></i>
											</Button>
										</LinkContainer>
									</td>
									<td>
										<Button
											variant='danger'
											className='btn-sm'
											onClick={() => deleteHandler(product._id)}
										>
											<i className='fas fa-trash'></i>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Paginate pages={pages} page={page} isAdmin={true} />
			 </>
		 )}
	  </>
  )
}

export default ProductListScreen