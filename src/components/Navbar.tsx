import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Store, ShoppingBag, ChevronDown } from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);

  const handleClickOutside = (setter: (open: boolean) => void) => {
    document.addEventListener('click', () => setter(false), { once: true });
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <Store className="h-8 w-8 mr-2" />
              <span className="text-xl font-semibold text-gray-900">
                {import.meta.env.VITE_BRAND_NAME}
              </span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {/* Brand Widget Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setBrandDropdownOpen(!brandDropdownOpen);
                  setProductDropdownOpen(false);
                  if (!brandDropdownOpen) {
                    handleClickOutside(setBrandDropdownOpen);
                  }
                }}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  location.pathname.startsWith('/brand-widget')
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Store className="h-5 w-5 mr-1" />
                <span>Brand Widget</span>
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${brandDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {brandDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <button
                    onClick={() => {
                      navigate('/brand-widget');
                      setBrandDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Full Widget
                  </button>
                  <button
                    onClick={() => {
                      navigate('/brand-widget-config');
                      setBrandDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Widget Configuration
                  </button>
                </div>
              )}
            </div>

            {/* Product Widget Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setProductDropdownOpen(!productDropdownOpen);
                  setBrandDropdownOpen(false);
                  if (!productDropdownOpen) {
                    handleClickOutside(setProductDropdownOpen);
                  }
                }}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  location.pathname.startsWith('/product-widget')
                    ? 'bg-green-100 text-green-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <ShoppingBag className="h-5 w-5 mr-1" />
                <span>Product Widget</span>
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${productDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {productDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <button
                    onClick={() => {
                      navigate('/product-widget');
                      setProductDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Full Widget
                  </button>
                  <button
                    onClick={() => {
                      navigate('/product-widget-config');
                      setProductDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Widget Configuration
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar