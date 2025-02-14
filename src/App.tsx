import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductSearch from './components/ProductSearch';
import CheckoutForm from './components/CheckoutForm';
import OrderConfirmation from './components/OrderConfirmation';
import OrderReview from './components/OrderReview';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<ProductSearch />} />
          <Route path="/checkout/:id" element={<CheckoutForm />} />
          <Route path="/review" element={<OrderReview />} />
          <Route path="/confirmation" element={<OrderConfirmation />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;