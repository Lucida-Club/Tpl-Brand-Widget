import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import algoliasearch from 'algoliasearch';
import { Search, MapPin, ShoppingCart, Trash2, Filter } from 'lucide-react';
import type { SearchResult } from '../../shared/types';

// Initialize Algolia client using environment variables
const client = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_API_KEY
);
const index = client.initIndex(import.meta.env.VITE_ALGOLIA_INDEX_NAME);

function ProductSearch() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [retailers, setRetailers] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedRetailer, setSelectedRetailer] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  const formatDistance = (meters: number): string => {
    const miles = meters * 0.000621371; // Convert meters to miles
    return miles.toFixed(1);
  };

  const handleSearch = useCallback(async (query: string, retailerId?: string, category?: string) => {
    setLoading(true);
    try {
      const searchParams: any = {
        query,
        hitsPerPage: 20,
        facets: ['retailerId', 'category'],
        numericFilters: ['totalQuantityOnHand > 0'],
        aroundLatLngViaIP: true,
        getRankingInfo: true
      };

      const facetFilters = [];
      if (retailerId) {
        facetFilters.push(`retailerId:${retailerId}`);
      }
      if (category) {
        facetFilters.push(`category:${category}`);
      }
      if (facetFilters.length > 0) {
        searchParams.facetFilters = facetFilters;
      }

      const { hits, facets } = await index.search(query, searchParams);
      
      const processedHits = hits.map((hit: any) => ({
        ...hit,
        distance: hit._rankingInfo?.geoDistance || hit._rankingInfo?.matchedGeoLocation?.distance || null
      }));
      
      setResults(processedHits as SearchResult[]);
      
      if (facets?.retailerId) {
        const retailerList = Object.keys(facets.retailerId);
        setRetailers(retailerList);
      } else {
        setRetailers([]);
      }
      if (facets?.category) {
        const categoryList = Object.keys(facets.category);
        setCategories(categoryList);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchTerm, selectedRetailer, selectedCategory);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedRetailer, selectedCategory, handleSearch]);

  useEffect(() => {
    handleSearch('');
  }, [handleSearch]);

  const handleManualSearch = () => {
    handleSearch(searchTerm, selectedRetailer, selectedCategory);
  };

  const handleCheckout = (item: SearchResult) => {
    navigate(`/checkout/${item.objectID}`, { state: { product: item } });
  };

  const handleClearFilters = () => {
    setSelectedCategory('');
    setSelectedRetailer('');
  };

  const hasActiveFilters = selectedCategory || selectedRetailer;

  return (
    <div className="p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex w-full sm:w-[40%] gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                id="search-input"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleManualSearch}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
              disabled={loading}
            >
              {loading ? '...' : 'Search'}
            </button>
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter size={20} />
            </button>
          </div>

          <div id="filters-section" className={`${showFilters ? 'flex' : 'hidden'} sm:flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto`}>
            {categories.length > 0 && (
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none w-full sm:w-[200px] px-4 py-2 pr-8 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            )}
            {retailers.length > 0 && (
              <div className="relative">
                <select
                  value={selectedRetailer}
                  onChange={(e) => setSelectedRetailer(e.target.value)}
                  className="appearance-none w-full sm:w-[200px] px-4 py-2 pr-8 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Retailers</option>
                  {retailers.map((retailer) => (
                    <option key={retailer} value={retailer}>
                      {retailer}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            )}
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                title="Clear filters"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          {/* Desktop view */}
          <div className="hidden sm:block">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Distance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {results.map((result) => (
                  <tr key={result.objectID} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span>{result.productName || 'No product name available'}</span>
                        <span className="text-xs text-gray-500">
                          Store: {result.storeName || 'N/A'} • Category: {result.category || 'N/A'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-gray-600">
                        <MapPin size={16} className="mr-1" />
                        {result.distance ? `${formatDistance(result.distance)} miles` : 'Distance unavailable'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleCheckout(result)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
                      >
                        <ShoppingCart size={16} className="mr-1" />
                        Checkout
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile view */}
          <div className="sm:hidden divide-y divide-gray-200">
            {results.map((result) => (
              <div key={result.objectID} className="p-4 hover:bg-gray-50">
                <div className="mb-2">
                  <h3 className="font-medium">{result.productName || 'No product name available'}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Store: {result.storeName || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Category: {result.category || 'N/A'}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-700">
                    <span className="flex items-center">
                      <MapPin size={16} className="mr-1" />
                      {result.distance ? `${formatDistance(result.distance)} miles` : 'Distance unavailable'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleCheckout(result)}
                  className="w-full mt-2 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
                >
                  <ShoppingCart size={16} className="mr-1" />
                  Checkout
                </button>
              </div>
            ))}
          </div>

          {results.length === 0 && (
            <div className="px-6 py-4 text-center text-gray-500">
              {loading ? 'Searching...' : 'No results found'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductSearch;