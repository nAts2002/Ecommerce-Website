import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  allProducts: [],
  topProducts: [],
  product: { reviews: [] },
  loading: false,
  error: null,
  success: false,
  successCreate: false,
  createdProduct: null,
  successUpdate: false,
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productListRequest(state) {
      state.loading = true
      state.allProducts = []
    },
    productListSuccess(state, action) {
      state.loading = false
      state.allProducts = action.payload.products
      state.pages = action.payload.pages
      state.page = action.payload.page
    },
    productListFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
    productDetailsRequest(state) {
      state.loading = true
    },
    productDetailsSuccess(state, action) {
      state.loading = false
      state.product = action.payload
    },
    productDetailsFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
    productDeleteRequest(state) {
      state.loading = true
    },
    productDeleteSuccess(state) {
      state.loading = false
      state.success = true
    },
    productDeleteFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
    productCreateRequest(state) {
      state.loading = true
    },
    productCreateSuccess(state, action) {
      state.loading = false
      state.successCreate = true 
      state.createdProduct = action.payload 
      state.allProducts.push(action.payload)
    },
    productCreateFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
    productCreateReset(state) {
      state.success = false
    },
    productUpdateRequest(state) {
      state.loading = true
    },
    productUpdateSuccess(state, action) {
      state.loading = false
      state.successUpdate = true
      state.product = action.payload
    },
    productUpdateFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
    productUpdateReset(state) {
      state.success = false
    },
    productReviewCreateRequest(state) {
      state.loading = true
    },
    productReviewCreateSuccess(state) {
      state.loading = false
      state.success = true
    },
    productReviewCreateFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
    productReviewCreateReset(state) {
      state.success = false
    },
     productTopRatedRequest(state){
      	state.loading=true;
       	state.topProducts=[];
    	},
    	productTopRatedSuccess(state,action){
      	state.loading=false;
        state.success=true;
       	state.topProducts=action.payload;
    	},
    	productTopRatedFail(state,action){
      	state.loading=false;
       	state.error=action.payload;
    	},
      productReviewCreateReducer(state, action) {
        switch(action.type) {
          case 'PRODUCT_CREATE_REVIEW_REQUEST':
            return { loading: true }
          case 'PRODUCT_CREATE_REVIEW_SUCCESS':
            return { loading: false, success: true }
          case 'PRODUCT_CREATE_REVIEW_FAIL':
            return { loading: false, error: action.payload }
          case 'PRODUCT_CREATE_REVIEW_RESET':
            return {}
          default:
            return state
        }
      }
  }
})

export const {
  productListRequest,
  productListSuccess,
  productListFail,
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFail,
  productDeleteRequest,
  productDeleteSuccess,
  productDeleteFail,
  productCreateRequest,
  productCreateSuccess,
  productCreateFail,
  productCreateReset,
  productUpdateRequest,
  productUpdateSuccess,
  productUpdateFail,
  productUpdateReset,
  productReviewCreateRequest,
  productReviewCreateSuccess,
  productReviewCreateFail,
  productReviewCreateReset,
  productTopRatedRequest,
  productTopRatedSuccess,
  productTopRatedFail,
  productReviewCreateReducer
} = productSlice.actions

export const listProducts = (keyword = '', pageNumber = '') => async dispatch => {
  try {
    dispatch(productListRequest())
    const { data } = await axios.get(`http://localhost:5000/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
    dispatch(productListSuccess(data))
  } catch (error) {
    dispatch(productListFail(error.response && error.response.data.message ? error.response.data.message : error.message))
  }
}

export const listProductDetails = id => async dispatch => {
  try {
    dispatch(productDetailsRequest())
    const { data } = await axios.get(`http://localhost:5000/api/products/${id}`)
    dispatch(productDetailsSuccess(data))
  } catch (error) {
    dispatch(productDetailsFail(error.response && error.response.data.message ? error.response.data.message : error.message))
  }
}

export const deleteProduct = id => async (dispatch, getState) => {
  try {
    dispatch(productDeleteRequest())
    const { user: { userInfo } } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    await axios.delete(`http://localhost:5000/api/products/${id}`, config)
    dispatch(productDeleteSuccess())
  } catch (error) {
    dispatch(productDeleteFail(error.response && error.response.data.message ? error.response.data.message : error.message))
  }
}

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch(productCreateRequest())
    const { user: { userInfo } } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.post(`http://localhost:5000/api/products`, {}, config)
    dispatch(productCreateSuccess(data))
  } catch (error) {
    dispatch(productCreateFail(error.response && error.response.data.message ? error.response.data.message : error.message))
  }
}

export const updateProduct = product => async (dispatch, getState) => {
  try {
    dispatch(productUpdateRequest())
    const { user: { userInfo } } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.put(`http://localhost:5000/api/products/${product._id}`, product, config)
    dispatch(productUpdateSuccess(data))
  } catch (error) {
    dispatch(productUpdateFail(error.response && error.response.data.message ? error.response.data.message : error.message))
  }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch(productReviewCreateRequest())
    const { user: { userInfo } } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    await axios.post(`http://localhost:5000/api/products/${productId}/reviews`, review, config)
    dispatch(productReviewCreateSuccess())
  } catch (error) {
    dispatch(productReviewCreateFail(error.response && error.response.data.message ? error.response.data.message : error.message))
  }
}

export const listTopProducts = () => async dispatch => {
  try {
    dispatch(productTopRatedRequest())
    const { data } = await axios.get(`http://localhost:5000/api/products/top`)
    dispatch(productTopRatedSuccess(data))
  } catch (error) {
    dispatch(productTopRatedFail(error.response && error.response.data.message ? error.response.data.message : error.message))
  }
}



export default productSlice.reducer
