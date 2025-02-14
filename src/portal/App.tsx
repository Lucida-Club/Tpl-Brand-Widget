import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BrandWidget from '../brand/components/ProductSearch';
import CheckoutForm from '../shared/components/CheckoutForm';
import OrderConfirmation from '../shared/components/OrderConfirmation';
import OrderReview from '../shared/components/OrderReview';
import ScrollToTop from '../shared/components/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<BrandWidget />} />
          <Route path="/checkout/:id" element={<CheckoutForm />} />
          <Route path="/review" element={<OrderReview />} />
          <Route path="/confirmation" element={<OrderConfirmation />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;