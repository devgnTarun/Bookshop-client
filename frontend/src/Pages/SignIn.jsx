import { useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import LoginImage from '../../public/signup.png'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function SignIn() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleUserData = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    if (validate(userData)) {
      console.log('user: ' + JSON.stringify(userData, null, 2))

      try {
        setLoading(true);
        const response = await Axios.post(
          'http://localhost:4000/auth/login',
          userData,
        )
        const data = response.data
        console.log('User added:', data.accessToken)
        // Show success toast
        const expirationTimeInMinutes = 15
        const expirationDate = new Date(
          new Date().getTime() + expirationTimeInMinutes * 60 * 1000,
        )

        Cookies.set('authToken', data.accessToken, { expires: expirationDate })
        toast.success('user signed in successfully!')
        setLoading(false);
        navigate('/')
        return data
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.error.replace(/"/g, '')
          : error.message

        // Show error toast
        setLoading(false);
        toast.error(`Error: ${errorMessage}`)
        return error
      }
    }
  }

  const validate = (data) => {
    console.log(data)
    return true
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="d-flex justify-content-center mt-8">
          <div className="w-md-50 border p-4">
            <div>
              <img src={LoginImage} alt="Sign Up" className="img-fluid" />
            </div>

            <form className="mt-4">
              <div className="mb-4">
                <label htmlFor="email" className="form-label text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleUserData}
                  className="form-control mt-1"
                  placeholder="Enter email"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userData.password}
                  onChange={handleUserData}
                  className="form-control mt-1"
                  placeholder="Enter password"
                />
              </div>

              <div>
                <button
                  className="btn btn-primary w-100 disable:opacity-[50]"
                  onClick={handleLogin}
                  type="button"
                  disabled={loading}
                >
                  Sign In
                </button>
              </div>
            </form>

            <div className="mt-4">
              <p className="text-center">
                Do not have an account?{' '}
                <Link to="/sign-up" className="text-primary">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  )
}

export default SignIn
