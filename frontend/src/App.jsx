import About from './Pages/About'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Privacy from './Pages/Privacy'
import NotFound from './Pages/NotFound'
import SignUp from '../src/Pages/SignUp'
import SignIn from '../src/Pages/SignIn'
import Dashboard from '../src/Pages/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About-us" element={<About />} />
        <Route path="/Privacy-Policy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </div>
  )
}

export default App
