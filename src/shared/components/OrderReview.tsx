import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import type { RootState } from '../store/store';

function OrderReview() {
  const navigate = useNavigate();
  const { product, quantity, formData } = useSelector((state: RootState) => state.checkout);

  if (!product || !formData) {
    navigate('/');
    return null;
  }

  const total = (product.price || 0) * quantity;

  const handleConfirmOrder = () => {
    const orderId = Math.floor(100000 + Math.random() * 900000).toString();
    navigate('/confirmation', {
      state: {
        product,
        orderId,
        quantity,
        formData
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={20} className="mr-1" />
          Back to Checkout
        </button>

        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Review Your Order</h1>
            <ShieldCheck className="text-green-600" size={32} />
          </div>

          <div className="space-y-8">
            {/* Product Details */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold mb-4">Product Details</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-4">{product.productName}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-sm">
                    <div className="flex flex-col">
                      <span className="text-gray-600 mb-1">Store</span>
                      <span className="font-medium">{product.storeName || 'N/A'}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 mb-1">Quantity</span>
                      <span className="font-medium">{quantity}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 mb-1">Price</span>
                      <span className="font-medium">${product.price?.toFixed(2)} each</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-blue-50 rounded-lg p-4">
                  <span className="font-medium">Subtotal</span>
                  <span className="text-lg font-semibold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold mb-4">Customer Details</h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Contact Information</h3>
                  <div className="space-y-1">
                    <p className="font-medium">
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p className="text-gray-700">{formData.email || 'No email provided'}</p>
                    <p className="text-gray-700">{formData.phone}</p>
                    <p className="text-gray-700">{formData.state}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-3 border-t">
                  <span>Total (USD)</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleConfirmOrder}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderReview;