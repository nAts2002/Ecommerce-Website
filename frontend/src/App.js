import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import UserEditScreen from './screens/UserEditScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import ProductScreen from './screens/ProductScreen';
import ProductListScreen from './screens/ProductListScreen.js';
import ProductEditScreen from './screens/ProductEditScreen.js';
import CartScreen from './screens/CartScreen';
import UserListScreen from './screens/UserListScreen.js';
import OrderListScreen from './screens/OrderListScreen.js';
import ShippingScreen from './screens/ShippingScreen.js';
import PaymentScreen from './screens/PaymentScreen.js';
import PlaceOrderScreen from './screens/PlaceOrderScreen.js';
import OrderScreen from './screens/OrderScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/user/:id/edit' element={<UserEditScreen/>} />
            <Route path='/' element={<HomeScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/admin/productlist' element ={<ProductListScreen/>}/>
            <Route path='/admin/product/:id/edit' element ={<ProductEditScreen/>}/>
            <Route path='/admin/userlist' element ={<UserListScreen/>}/>
            <Route path='/admin/user/:id/edit' element ={<UserEditScreen/>}/>
            <Route path='/admin/orderlist' element ={<OrderListScreen/>}/>
            <Route path='/cart/:id?' element={<CartScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/order/:id' element={<OrderScreen/>} />
            <Route path='/profile' element={<ProfileScreen/>} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;