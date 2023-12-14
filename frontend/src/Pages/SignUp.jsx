import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import Navbar from '../Components/Navbar'
import Axios from 'axios'
import Footer from '../Components/Footer'
import { Link } from 'react-router-dom'
import * as style from './SignUp.css'
import SignUpImage from '../../public/signup.png'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
/* */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SignUp() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const handleRegister = async (e) => {
    e.preventDefault()

    if (validate(userData)) {
      console.log('user: ' + JSON.stringify(userData, null, 2))

      try {
        setLoading(true);
        const response = await Axios.post(
          'http://localhost:4000/auth/create',
          userData,
        )
        const data = response.data
        console.log('User added:', data)
        navigate('/')
        // Show success toast
        toast.success('Sign-up successful!')
        setLoading(false);
        return data
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.error.replace(/"/g, '')
          : error.message

        // Show error toast
        toast.error(`Error: ${errorMessage}`)
        setLoading(false);
        return error
      }
    }
  }

  const validate = (data) => {
    console.log(data)
    return true
  }

  const handleUserData = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }
  return (
    <div>
      <Navbar />
      <Container>
        <Row className="justify-content-md-center mt-1">
          <Col md="6">
            <div className={style.Container}>
              <img src={SignUpImage} alt="Sign Up" className={style.image} />

              <Form>
                <Form.Group controlId="formBasicFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    onChange={handleUserData}
                    value={userData.firstName}
                    placeholder="Enter your first name"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    onChange={handleUserData}
                    value={userData.lastName}
                    placeholder="Enter your last name"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={handleUserData}
                    value={userData.email}
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={handleUserData}
                    value={userData.password}
                    placeholder="Password"
                  />
                </Form.Group>

                <Button
                  onClick={handleRegister}
                  className={`${style.submitButton} disabled:opacity-[50]`}
                  variant="primary"
                  disabled={loading}
                // type="submit"
                >
                  Submit
                </Button>
              </Form>

              <div className={style.centerText}>
                <p>
                  Already have an account? <Link to="/sign-in">Sign In</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
      <Footer />
    </div>
  )
}

export default SignUp
