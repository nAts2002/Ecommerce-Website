import React from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../redux/userSlice'

const Header = () => {
	const dispatch = useDispatch()
	const userInfo = useSelector((state) => state.user.userInfo)

	const logoutHandler = () => {
		dispatch(logout())
	}

	return (
		<header>
			<Navbar
				className='text-uppercase'
				bg='primary'
				variant='dark'
				expand='lg'
				collapseOnSelect
			>
				<Container>
					{/* Home */}
					<Link to='/'>
						<Navbar.Brand>Store</Navbar.Brand>
					</Link>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Routes>
						<Route render={({ history }) => <SearchBox history={history} />} />
						</Routes>
						<Nav className='ml-auto'>
							{/* Cart */}
							<Link to='/cart'>
								<Nav.Link href='/cart'>
									<i className='fas fa-shopping-cart'></i> Cart
								</Nav.Link>
							</Link>
							{userInfo ? (
								<NavDropdown title={userInfo.name} id='username'>
									{/* Profile */}
									<Link to='/profile'>
										<NavDropdown.Item href='/profile'>
											My Orders
										</NavDropdown.Item>
									</Link>
									{/* Logout */}
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								// Login
								<Link to='/login'>
									<Nav.Link href='/login'>
									<i className='fas fa-user'></i> Sign In
									</Nav.Link>
								</Link>
							)}
							{userInfo && userInfo.isAdmin && (
								<NavDropdown title='Admin' id='adminmenu'>
									<Link to='/admin/userlist'>
										<NavDropdown.Item href='/admin/userlist'>Users</NavDropdown.Item>
									</Link>
									<Link to='/admin/productlist'>
										<NavDropdown.Item href='/admin/productlist'>Products</NavDropdown.Item>
									</Link>
									<Link to='/admin/orderlist'>
										<NavDropdown.Item href='/admin/orderlist'>Orders</NavDropdown.Item>
									</Link>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}

export default Header
