	import { createSlice } from '@reduxjs/toolkit'
	import axios from 'axios'

	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2)
	}

	const cartSlice = createSlice({
		name: 'cart',
		initialState: {
			cartItems: [],
			shippingAddress: {},
			paymentMethod: '',
			itemsPrice: 0,
			shippingPrice: 0,
			taxPrice: 0,
			totalPrice: 0,
		},
		reducers: {
			cartAddItem(state, action) {
				const item = action.payload
				const existItem = state.cartItems.find(
					(x) => x.product === item.product
				)
				if (existItem) {
					state.cartItems = state.cartItems.map((x) =>
						x.product === existItem.product ? item : x
					)
				} else {
					state.cartItems.push(item)
				}
			},
			cartRemoveItem(state, action) {
				state.cartItems = state.cartItems.filter(
					(x) => x.product !== action.payload
				)
			},
			saveShippingAddress(state, action) {
				state.shippingAddress = action.payload
			},
			savePaymentMethod(state, action) {
				state.paymentMethod = action.payload
			},
			cartClearItems(state) {
				state.cartItems = []
			},
		},
	})

	export const {
		cartAddItem,
		cartRemoveItem,
		saveShippingAddress,
		savePaymentMethod,
		cartClearItems,
		cartCalculateItemsPrice,
		cartCalculateShippingPrice,
		cartCalculateTaxPrice,
		cartCalculateTotalPrice,
	} = cartSlice.actions

	export default cartSlice.reducer

	export const addToCart = (id, qty) => async (dispatch, getState) => {
		const { data } = await axios.get(`http://localhost:5000/api/products/${id}`)
		dispatch(
			cartAddItem({
				product: data._id,
				name: data.name,
				image: data.image,
				price: data.price,
				countInStock: data.countInStock,
				qty,
			})
		)
		localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
	}

	export const removeFromCart = (id) => async (dispatch, getState) => {
		dispatch(cartRemoveItem(id))
		localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
	}

	