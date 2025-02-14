import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft } from 'lucide-react';
import type { SearchResult } from '../types';
import { setProduct, setQuantity, setFormData } from '../store/checkoutSlice';
import type { RootState } from '../store/store';

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
];

function CheckoutForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product: storedProduct, quantity: storedQuantity, formData: storedFormData } = 
    useSelector((state: RootState) => state.checkout);
  
  const { product: locationProduct } = location.state as { product: SearchResult };
  const [quantity, setLocalQuantity] = useState(storedQuantity);
  
  useEffect(() => {
    if (locationProduct) {
      dispatch(setProduct(locationProduct));
    }
  }, [locationProduct, dispatch]);

  const product = storedProduct || locationProduct;
  const maxQuantity = product.totalQuantityOnHand || 1;

  const handleQuantityChange = (newQuantity: number) => {
    setLocalQuantity(newQuantity);
    dispatch(setQuantity(newQuantity));
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, '');
    
    // Format the number as XXX-XXX-XXXX
    if (phoneNumber.length >= 10) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    } else if (phoneNumber.length >= 6) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
    } else if (phoneNumber.length >= 3) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return phoneNumber;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(e.target.value.replace(/-/g, ''));
    e.target.value = formattedNumber;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const checkoutData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      state: formData.get('state') as string,
    };
    
    dispatch(setFormData(checkoutData));
    navigate('/review');
  };

  const total = (product.price || 0) * quantity;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={20} className="mr-1" />
          Back to Search
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Customer Information Form */}
          <div className="flex-grow order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Customer Information</h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      placeholder="Enter your first name"
                      defaultValue={storedFormData?.firstName}
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      placeholder="Enter your last name"
                      defaultValue={storedFormData?.lastName}
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Enter your email address"
                    defaultValue={storedFormData?.email}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Cell Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    defaultValue={storedFormData?.phone}
                    onChange={handlePhoneChange}
                    placeholder="XXX-XXX-XXXX"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">Format: XXX-XXX-XXXX</p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                      Select the state on your license
                    </label>
                    <span className="text-sm text-red-500">*</span>
                  </div>
                  <div className="relative mt-1">
                    <select
                      id="state"
                      name="state"
                      required
                      defaultValue={storedFormData?.state}
                      className="appearance-none block w-full rounded-md border border-gray-300 bg-white py-2 px-3 pr-8 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    >
                      <option value="">Choose...</option>
                      {US_STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Review Order
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="w-full lg:w-96 order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Your cart</h2>
                <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full">
                  1
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">{product.productName}</h3>
                    <p className="text-sm text-gray-500">Store: {product.storeName}</p>
                    <div className="mt-2">
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                        Quantity
                      </label>
                      <div className="relative mt-1">
                        <select
                          id="quantity"
                          value={quantity}
                          onChange={(e) => handleQuantityChange(Number(e.target.value))}
                          className="appearance-none block w-full rounded-md border border-gray-300 bg-white py-2 px-3 pr-8 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        >
                          {[...Array(maxQuantity)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="text-base font-medium text-gray-900">
                    ${product.price?.toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-base font-medium text-gray-900">Total (USD)</span>
                    <span className="text-base font-medium text-gray-900">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;