import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'

const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}
const authenticatedOptions = (
	<>
		<Nav.Link>
			<Link to='my-scores' style={linkStyle}>
				My Scores
			</Link>
		</Nav.Link>
		<Nav.Link>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Link>
		<Nav.Link>
			<Link to='sign-out' style={linkStyle}>
				Log out
			</Link>
		</Nav.Link>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Link>
		    <Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Link>
        <Nav.Link>
		    <Link to='sign-in' style={linkStyle}>Log In</Link>
        </Nav.Link>
	</>
)

const Header = ({ user }) => (
	<Navbar bg='secondary' fixed='top' variant='dark' expand='sm'>
		<Navbar.Brand >
			<Nav.Link>
				<Link to='/' style={linkStyle}>Algo-Views</Link>
			</Nav.Link>
		</Navbar.Brand>
		<Nav.Item>
			<Nav.Link>
				<Link to='/algo-test' style={linkStyle}>Test Your Knowledge</Link>
			</Nav.Link>
		</Nav.Item>
        
		<Navbar.Toggle aria-controls='basic-navbar-nav'/>
		<Navbar.Collapse id='basic-navbar-nav' className="justify-content-end">
			<Nav className='ml-auto justify-content-center'>
				{user && (
					<span className='navbar-text mr-2'>Welcome, {user.email}</span>
				)}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>

	
)

export default Header
