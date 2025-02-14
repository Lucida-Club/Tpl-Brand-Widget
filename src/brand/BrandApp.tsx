import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductSearch from './components/ProductSearch';
import CheckoutForm from '../shared/components/CheckoutForm';
import OrderConfirmation from '../shared/components/OrderConfirmation';
import OrderReview from '../shared/components/OrderReview';
import ScrollToTop from '../shared/components/ScrollToTop';

function BrandApp() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<ProductSearch />} />
        <Route path="/checkout/:id" element={<CheckoutForm />} />
        <Route path="/review" element={<OrderReview />} />
        <Route path="/confirmation" element={<OrderConfirmation />} />
      </Routes>
    </div>
  );
}

export default BrandApp;