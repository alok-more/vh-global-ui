import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QueryProvider from './context/QueryProvider';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Company from './pages/Company';
import Contact from './pages/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <QueryProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/company" element={<Company />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </QueryProvider>
  );
}

export default App;