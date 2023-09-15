
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null

const initialState = {
  userInfo: userInfoFromStorage,
  users: [],
  user: {},
  loading: false,
  error: null,
  loadingUpdate: false,
  errorUpdate: null,
  successUpdate: false,
  successDelete: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoginRequest(state) {
      state.loading = true
    },
    userLoginSuccess(state, action) {
      state.loading = false
      state.userInfo = action.payload
      state.error = null
      localStorage.setItem('userId', JSON.stringify(state.userInfo._id))
    },
    userLoginFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
    userLogout(state) {
      state.userInfo = null
    },
    userRegisterRequest(state) {
      state.loading = true
    },
    userRegisterSuccess(state, action) {
      state.loading = false
      state.userInfo = action.payload
    },
    userRegisterFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
    userDetailsRequest(state) {
      state.loading = true
    },
    userDetailsSuccess(state, action) {
      state.loading = false
      state.user = action.payload
    },
    userDetailsFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
    userDetailsReset(state) {
      state.user = null
    },
    userUpdateProfileRequest(state) {
      state.loading = true
    },
    userUpdateProfileSuccess(state, action) {
      state.loading = false
      state.userInfo = action.payload
      state.successUpdate = true
    },
    userUpdateProfileFail(state, action) {
      state.loading = false
      state.errorUpdate = action.payload
    },
    userListRequest(state) {
      state.loading = true
    },
    userListSuccess(state, action) {
      state.loading = false
      state.users = action.payload
    },
    userListFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
    userListReset(state) {
      state.users = []
    },
    userDeleteRequest(state) {
      state.loading = true
    },
    userDeleteSuccess(state) {
      state.loading = false
    },
    userDeleteFail(state, action) {
      state.loading = false
      state.error = action.payload
    },
    userUpdateRequest(state) {
      state.loadingUpdate = true
    },
    userUpdateSuccess(state) {
      state.loading = false
      state.successUpdate = true
    },
    userUpdateFail(state, action) {
      state.loading = false
      state.errorUpdate = action.payload
    }
  }
})

export const {
  userLoginRequest,
  userLoginSuccess,
  userLoginFail,
  userLogout,
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFail,
  userDetailsRequest,
  userDetailsSuccess,
  userDetailsFail,
  userDetailsReset,
  userUpdateProfileRequest,
  userUpdateProfileSuccess,
  userUpdateProfileFail,
  userListRequest,
  userListSuccess,
  userListFail,
  userListReset,
  userDeleteRequest,
  userDeleteSuccess,
  userDeleteFail,
  userUpdateRequest,
  userUpdateSuccess,
  userUpdateFail
} = userSlice.actions

export default userSlice.reducer

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(userLoginRequest())

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.post(
      'http://localhost:5000/api/users/login',
      { email, password },
      config
    )

    dispatch(userLoginSuccess(data))
 
     localStorage.setItem('userInfo', JSON.stringify(data)) 
     
     } catch (error) { 
   let errorMessage = "";
   if (error.response.status === 401) {
     errorMessage = "Invalid email or password. Please try again.";
   } else if (error.response.status === 500) {
     errorMessage = "Server error. Please try again later.";
   } else {
     errorMessage = error.message;
   }
   console.log(errorMessage);

   dispatch(userLoginFail(errorMessage)) 
     } 
   } 

export const logout = () => (dispatch) => {
   localStorage.removeItem('userInfo') 
   localStorage.removeItem('cartItems') 
   localStorage.removeItem('shippingAddress') 
   localStorage.removeItem('paymentMethod') 
   dispatch(userLogout()) 
   dispatch({ type: 'USER_DETAILS_RESET' }) 
   dispatch({ type: 'ORDER_LIST_MY_RESET' }) 
   dispatch({ type: 'USER_LIST_RESET' }) 
   document.location.href = '/login' 
 } 

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch(userRegisterRequest())

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.post(
      'http://localhost:5000/api/users',
      { name, email, password },
      config
    )
    dispatch(userRegisterSuccess(data))
    dispatch(userLoginSuccess(data))
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch(
      userRegisterFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(userDetailsRequest())
    const {
      user: { userInfo }
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`http://localhost:5000/api/users/${id}`, config)
    dispatch(userDetailsSuccess(data))
  } catch (error) {
    dispatch(
      userDetailsFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch(userUpdateProfileRequest())
    const {
      user: { userInfo }
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.put('http://localhost:5000/api/users/profile', user, config)
     dispatch(userUpdateProfileSuccess(data)) 
     dispatch(userLoginSuccess(data)) 
     localStorage.setItem('userInfo', JSON.stringify(data)) 
     
     } catch (error) { 
       dispatch(userUpdateProfileFail( 
         error.response && error.response.data.message 
           ? error.response.data.message 
           : error.message 
       )) 
     } 
   } 

export const listUsers = () => async (dispatch) => {
  try {
    dispatch(userListRequest())
    const { data } = await axios.get('http://localhost:5000/api/users')

    dispatch(userListSuccess(data))
  } catch (error) {
    
     dispatch(userListFail( 
       error.response && error.response.data.message 
         ? error.response.data.message 
         : error.message 
     )) 
    
   } 
  
 }
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    
     dispatch(userDeleteRequest()) 
      const {
        user: { userInfo },
      } = getState()
    
     const config = { 
       headers: { 
         Authorization: `Bearer ${userInfo.token}`, 
       }, 
     } 
     await axios.delete(`http://localhost:5000/api/users/${id}`, config) 
    
     dispatch(userDeleteSuccess()) 
    
   } catch (error) { 
    
     dispatch(userDeleteFail( 
       error.response && error.response.data.message 
         ? error.response.data.message 
         : error.message 
     )) 
    
   } 
  
 }
