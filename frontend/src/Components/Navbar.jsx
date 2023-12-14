import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Cookies from 'js-cookie'

function Header() {
  const [token, setToken] = useState(Cookies.get('authToken') || null)

  const handleLogout = () => {
    Cookies.remove('authToken')
  }
  return (
    <Navbar style={{ backgroundColor: '#001f3f', color: '#ffffff' }}>
      <div className="container">
        <Navbar.Brand as={Link} to="/" style={{ color: '#ffffff' }}>
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/" style={{ color: '#ffffff' }}>
              PopularBooks
            </Nav.Link>
            <Nav.Link as={Link} to="/" style={{ color: '#ffffff' }}>
              Kids
            </Nav.Link>
            <Nav.Link as={Link} to="/about-us" style={{ color: '#ffffff' }}>
              About Us
            </Nav.Link>
            {token !== null ? (
              <>
                {/* User is authenticated */}
                <Nav.Link
                  as={Link}
                  to="/dashboard"
                  style={{ color: '#ffffff' }}
                >
                  Dashboard
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/"
                  style={{ color: '#ffffff' }}
                  onClick={handleLogout}
                >
                  Logout
                </Nav.Link>
                {/* Additional authenticated links can be added here */}
              </>
            ) : (
              <>
                {/* User is not authenticated */}
                <Nav.Link as={Link} to="/sign-up" style={{ color: '#ffffff' }}>
                  Sign Up
                </Nav.Link>
                <Nav.Link as={Link} to="/sign-in" style={{ color: '#ffffff' }}>
                  Sign In
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  )
}

export default Header
