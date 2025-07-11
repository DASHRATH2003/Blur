import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { SearchProvider } from './context/SearchContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Bestsellers from './pages/Bestsellers';
import PerfumeGuide from './pages/PerfumeGuide';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import GiftSets from './pages/GiftSets';
import CreatorZone from './components/CreatorZone';
import AddProduct from './pages/creator/AddProduct';
import ManageOrders from './pages/creator/ManageOrders';
import Inventory from './pages/creator/Inventory';
import AffiliateProgram from './pages/creator/AffiliateProgram';
import ContactSupport from './pages/ContactSupport';
import MeetTeam from './pages/MeetTeam';
import OrderHistory from './pages/OrderHistory';
import Checkout from './pages/Checkout';
import About from './pages/About';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <SearchProvider>
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 2000,
                  style: {
                    background: '#333',
                    color: '#fff',
                  },
                }}
              />
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/bestsellers" element={<Bestsellers />} />
                    <Route path="/fragrance/men" element={<Shop category="mens" />} />
                    <Route path="/fragrance/women" element={<Shop category="womens" />} />
                    <Route path="/fragrance/sugar" element={<Shop category="sugar" />} />
                    <Route path="/perfume-guide" element={<PerfumeGuide />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/gift-sets" element={<GiftSets />} />
                    <Route path="/creator" element={<ProtectedRoute><CreatorZone /></ProtectedRoute>} />
                    <Route path="/creator/add-product" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
                    <Route path="/creator/orders" element={<ProtectedRoute><ManageOrders /></ProtectedRoute>} />
                    <Route path="/creator/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
                    <Route path="/creator/affiliate" element={<ProtectedRoute><AffiliateProgram /></ProtectedRoute>} />
                    <Route path="/contact-support" element={<ContactSupport />} />
                    <Route path="/meet-team" element={<MeetTeam />} />
                    <Route path="/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
                    <Route path="/about" element={<About />} />
                  </Routes>
                </main>
              </div>
            </SearchProvider>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;