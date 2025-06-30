import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import Bestsellers from './pages/Bestsellers'
import GiftSets from './pages/GiftSets'
import { SearchProvider } from './context/SearchContext'
import { CartProvider } from './context/CartContext'

const App = () => {
  return (
    <CartProvider>
      <SearchProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/bestsellers" element={<Bestsellers />} />
                <Route path="/fragrance/men" element={<Shop category="mens" />} />
                <Route path="/fragrance/women" element={<Shop category="womens" />} />
                <Route path="/fragrance/sugar-muse" element={<Shop category="sugar" />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/gift-sets" element={<GiftSets />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </SearchProvider>
    </CartProvider>
  )
}

export default App