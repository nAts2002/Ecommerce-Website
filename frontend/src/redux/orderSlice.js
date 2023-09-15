import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const orderSlice = createSlice({
	name: 'order',
	initialState: {
		order: {},
		orderItems: [],
		shippingAddress: {},
		paymentMethod: '',
		orders: [],
		loading: false,
		error: null,
		success: false,
		successCreate: false,
		successPay: false,
		successDeliver: false,
	},
	reducers: {
		orderCreateRequest(state) {
			state.loading = true
		},
		orderCreateSuccess(state, action) {
			state.order.loading = false 
            state.order.successCreate = true
            state.order.order = action.payload
		},
		orderCreateFail(state, action) {
			state.loading = false
			state.error = action.payload
		},
		orderCreateReset(state) {
			state.order = {}
			state.successCreate = false
			state.error = null
		},
        orderDetailsRequest(state) {
            state.loading = true
        },
        orderDetailsSuccess(state, action) {
            state.loading = false
            state.order = action.payload
        },
        orderDetailsFail(state, action) {
            state.loading = false
            state.error = action.payload
        },
        orderPayRequest(state) {
            state.loading = true
        },
        orderPaySuccess(state, action) {
            state.loading = false
            state.successPay = true
        },
        orderPayFail(state, action) {
            state.loading = false
            state.error = action.payload
        },
        orderPayReset(state) {
            state.success = false 
            state.error = null 
        },
        orderListMyRequest(state) {
            state.loading = true 
        }, 
        orderListMySuccess(state, action) {
            state.loading = false 
            state.orders = action.payload 
        }, 
        orderListMyFail(state, action) {
            state.loading = false 
            state.error = action.payload 
        },
        orderListMyReset(state) {
            state.orders = [] 
            state.error = null 
        },
         orderListRequest(state) {
            state.loading = true 
        }, 
         orderListSuccess(state, action) {
            state.loading = false 
            state.orders = action.payload 
        },
         orderListFail(state, action) {
            state.loading = false 
            state.error = action.payload 
        },
         orderDeliverRequest(state) {
            state.loading = true 
        },
         orderDeliverSuccess(state, action) {
            state.loading = false 
            state.successDeliver= true 
            
        },
         orderDeliverFail(state, action) {
            state.loading = false 
            state.error=action.payload  
            
        },
         orderDeliverReset(state) {
             state.successDeliver=false  
             state.error=null  
            
         },
	},
})

export const {
	orderCreateRequest,
	orderCreateSuccess,
	orderCreateFail,
	orderCreateReset,
    orderDetailsRequest,
    orderDetailsSuccess,
    orderDetailsFail,
    orderPayRequest,
    orderPaySuccess,
    orderPayFail,
    orderPayReset,
    orderListMyRequest,
    orderListMySuccess,
    orderListMyFail,
    orderListMyReset,
    orderListRequest,
    orderListSuccess,
    orderListFail,
    orderDeliverRequest,
    orderDeliverSuccess,
    orderDeliverFail,
    orderDeliverReset
} = orderSlice.actions

export const selectOrder = (state) => state.order

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch(orderCreateRequest())
		const { user: { userInfo } } = getState()

		const { data } = await axios.post('http://localhost:5000/api/orders', order)
		dispatch(orderCreateSuccess(data))
        dispatch({ type: 'CART_CLEAR_ITEMS' })
	} catch (error) {
		dispatch(orderCreateFail(error.response && error.response.data.message ? error.response.data.message : error.message))
	}
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch(orderDetailsRequest())
		const { data } = await axios.get(`http://localhost:5000/api/orders/${id}`)
		dispatch(orderDetailsSuccess(data))
	} catch (error) {
		dispatch(orderDetailsFail(error.response && error.response.data.message ? error.response.data.message : error.message))
	}
}

export const payOrder = (orderId, paymentResult) => async (
	dispatch,
	getState
) => {
	try {
		dispatch(orderPayRequest())
		const { user: { userInfo } } = getState()
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
        const { data } = await axios.put(
			`http://localhost:5000/api/orders/${orderId}/pay`,
			paymentResult,
			config
        )
        dispatch(orderPaySuccess(data))
        dispatch(getOrderDetails(orderId))
        
		
	} catch (error) {
        dispatch(orderPayFail(error.response && error.response.data.message ? error.response.data.message : error.message))
        
		
    }
}

export const listMyOrders = () => async (dispatch, getState) => {
	try {
        dispatch(orderListMyRequest())
        const { user: { userInfo } } = getState()
        const { data } = await axios.get('http://localhost:5000/api/orders/myorders/'+ userInfo._id )
        dispatch(orderListMySuccess(data))
        console.log(data)   

        
		
    } catch (error) {
        dispatch(orderListMyFail(error.response && error.response.data.message ? error.response.data.message : error.message))
        
		
    }
}

export const listOrders = () => async (dispatch, getState) => {
	try {
        dispatch(orderListRequest())
        const { user: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.get('http://localhost:5000/api/orders', config)
        dispatch(orderListSuccess(data))
        
		
    } catch (error) {
        dispatch(orderListFail(error.response && error.response.data.message ? error.response.data.message : error.message))
        
		
    }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
	try {
        dispatch(orderDeliverRequest())
        const { user: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.put(
			`http://localhost:5000/api/orders/${order._id}/deliver`,
			{},
			config
        )
        dispatch(orderDeliverSuccess(data))
        
		
    } catch (error) {
        dispatch(orderDeliverFail(error.response && error.response.data.message ? error.response.data.message : error.message))
        
		
    }
}

export default orderSlice.reducer

