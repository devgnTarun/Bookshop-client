import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Slider from '../Components/Swiper'
import Cookies from 'js-cookie'

const polularSlider = [
  { id: 1, title: 'Make your bed', price: '1$', src: '/takht.jpg' },
  { id: 2, title: 'Midnight', price: '2$', src: '/night.jpg' },
  { id: 3, title: 'Girl', price: '3$', src: '/girl.jpg' },
  { id: 4, title: 'Be yourself', price: '4$', src: '/love.jpg' },
  { id: 5, title: 'Magic', price: '5$', src: '/road.jpg' },
  { id: 6, title: 'swallow your frog', price: '6$', src: '/frog.jpg' },
]
const KidsSlider = [
  { id: 7, title: 'frog', price: '1$', src: '/frog.jpg' },
  { id: 8, title: "Iran's history", price: '2$', src: '/Iran.jpg' },
  { id: 9, title: 'Girl', price: '3$', src: '/girl.jpg' },
  { id: 10, title: 'Be yourself', price: '4$', src: '/love.jpg' },
  { id: 11, title: 'Magic', price: '5$', src: '/road.jpg' },
  { id: 12, title: 'swallow your frog', price: '6$', src: '/frog.jpg' },
]

const Home = () => {
  const [token, setToken] = useState(Cookies.get('authToken') || '')
  const [books, setBooks] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          'http://localhost:4000/products/get-all-books',
          {
            headers: {
              Authorization: `${token}`, // Replace YOUR_AUTH_TOKEN with the actual token
            },
          },
        )
        setBooks(response.data)
        console.log('Books : ', response.data)
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.error.replace(/"/g, '')
          : error.message

        console.error(`Error: ${errorMessage}`)
      }
    }

    fetchData() // Call the async function immediately
  }, [token])

  return (
    <div style={{ backgroundColor: '#001f3f', color: '#ffffff' }}>
      <Navbar />
      <section
        className="hero bg-cover bg-center"
        style={{ backgroundImage: 'url("/book.avif")', height: '25rem' }}
      >
        <div className="bg-white bg-opacity-50 d-flex align-items-center h-100">
          <div className="container text-black text-center">
            <h1 className="display-4 font-weight-bold">
              A room without books is like a body without a soul.
            </h1>
            <p className="lead mt-4 font-weight-bold">
              Explore our wide selection of books.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-5">
        <h1 className="h2 font-weight-bold my-4">
          {' '}
          <span className="border-bottom border-dark pb-1 text-white">
            Popular Books
          </span>
        </h1>
        {books ? (
          <Slider sliderData={books} />
        ) : (
          <Slider sliderData={polularSlider} />
        )}
      </div>

      <div className="container mx-auto py- my-5">
        <h1 className="h2 font-weight-bold my-4">
          {' '}
          <span className="border-bottom border-dark pb-1 text-white">
            Kids
          </span>
        </h1>
        <Slider sliderData={KidsSlider} />
      </div>

      <Footer />
    </div>
  )
}

export default Home
