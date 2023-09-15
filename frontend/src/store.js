import { configureStore } from '@reduxjs/toolkit'
import userSlice from './redux/userSlice'
import productSlice, { listTopProducts, createProductReview } from './redux/productSlice'
import cartSlice from './redux/cartSlice'
import orderSlice from './redux/orderSlice'

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: []
const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null
const shipppingAddressFromStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {}
const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
	? JSON.parse(localStorage.getItem('paymentMethod'))
	: {}

  const initialState = {
    cart: {
      cartItems: cartItemsFromStorage,
      shippingAddress: shipppingAddressFromStorage,
      paymentMethod: paymentMethodFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
  }

const store = configureStore({
  reducer: {
    user: userSlice,
    product: productSlice,
    productTopRated: listTopProducts,
    productReviewCreate: createProductReview,
    cart: cartSlice,
    order: orderSlice,
  },
  initialState,
})

export default store