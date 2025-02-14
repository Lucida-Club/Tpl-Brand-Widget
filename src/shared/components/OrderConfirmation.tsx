import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Store } from 'lucide-react';
import { useDispatch } from 'react-redux';
import type { SearchResult } from '../types';
import { resetCheckout } from '../store/checkoutSlice';

interface OrderData {
  product: SearchResult;
  orderId: string;
  quantity: number;
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    state: string;
  };
}

function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, orderId, quantity, formData } = location.state as OrderData;
  const total = (product.price || 0) * quantity;

  useEffect(() => {
    // Reset the checkout state when the confirmation page is loaded
    dispatch(resetCheckout());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Store className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmation #{orderId}</h1>
          <p className="text-lg text-gray-600 mb-8">
            Your order is processing. You will be notified ASAP when the items are ready for pickup.
          </p>
        </div>

        <div className="space-y-4 text-left mb-8">
          <div className="border-t border-b border-gray-200 py-4">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Product:</span> {product.productName}
              </p>
              <p>
                <span className="font-medium">Quantity:</span> {quantity}
              </p>
              <p>
                <span className="font-medium">Price:</span> ${product.price?.toFixed(2)} each
              </p>
              <p>
                <span className="font-medium">Total:</span> ${total.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="border-b border-gray-200 py-4">
            <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}
              </p>
              {formData.email && (
                <p>
                  <span className="font-medium">Email:</span> {formData.email}
                </p>
              )}
              <p>
                <span className="font-medium">Phone:</span> {formData.phone}
              </p>
              <p>
                <span className="font-medium">State:</span> {formData.state}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p>
              <span className="font-medium">Store Name:</span> {product.storeName}
            </p>
            <p>
              <span className="font-medium">Store Address:</span> 102 Main Street, Walpole, MA 02110
            </p>
            <p>
              <span className="font-medium">Store Phone:</span> 555-333-3333
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </button>

        <div className="mt-12 text-sm text-gray-500">
          © 2024 Lucida
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;