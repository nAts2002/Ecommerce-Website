
import { Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails, updateProduct } from '../redux/productSlice'
import { useParams } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import { useState } from 'react'


const ProductEditScreen = () => {
	const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(listProductDetails(id))
        console.log('id', id)
      }, [dispatch, id]);
      const productInfo = useSelector((state) => state.product.product)
      const product = useMemo(() => productInfo, [productInfo])
        console.log('product', product)

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [countInStock, setCountInStock] = useState(0  )

    const { loading, error, successUpdate } = useSelector((state) => state.product)
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({_id:product._id ,name, price, description, countInStock}))
        console.log('name', name)
    }


    return (
        <div className='edit-product-screen'>
            <h1>Edit Product</h1>
            {loading && <Loader />}
            {error && <Message variant='danger'>{error}</Message>}
            {successUpdate && <Message variant='success'>Product Updated</Message>}
            <Form onSubmit={submitHandler}>
                <div className='form-group'>
                    <label  htmlFor='name'>Name</label>
                    <input
                        type='name'
                        className='form-control'
                        id='name'
                        placeholder={product.name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label  htmlFor='price'>Price</label>
                    <input
                        type='number'
                        className='form-control'
                        id='price'
                        placeholder={product.price}
                        onChange={(e) => setPrice(e.target.value)}
                        
                    />
                </div>
                <div className='form-group'>
                    <label  htmlFor='description'>Description</label>
                    <input
                        type='text'
                        className='form-control'
                        id='description'
                        placeholder={product.description}
                        onChange={(e) => setDescription(e.target.value)}
    
                    />
                </div>
                <div className='form-group'>
                    <label  htmlFor='countInStock'>Count In Stock</label>
                    <input
                        type='number'
                        className='form-control'
                        id='countInStock'
                        placeholder={product.countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                    />
                </div>
                <button type='submit' className='btn btn-primary'>
                    Update
                </button>
            </Form>
        </div>
    )
}

export default ProductEditScreen