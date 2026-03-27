'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, ChevronDown, Zap } from 'lucide-react';

export function HomepageSearchBar() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('All India');
  const [category, setCategory] = useState('All Categories');
  const [investment, setInvestment] = useState('Select Investment');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showInvestmentDropdown, setShowInvestmentDropdown] = useState(false);

  const cities = ['All India', 'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune'];
  const categories = [
    'All Categories',
    'QSR',
    'Health & Wellness',
    'Education & Training',
    'Global Pavilion',
    'Retail & Lifestyle',
    'Hospitality & Stay',
    'Kids & Entertainment',
    'Ecosystem & Support',
    'Automobile & EV',
    'Business Services',
    'Home Services',
    'Finance & Banking'
  ];
  const investments = ['Select Investment', '₹5-10 Lakhs', '₹10-25 Lakhs', '₹25-50 Lakhs', '₹50+ Lakhs'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.append('keyword', keyword);
    if (category !== 'All Categories') params.append('category', category);
    if (investment !== 'Select Investment') params.append('investment', investment);
    if (location !== 'All India') params.append('location', location);
    
    router.push(`/franchises?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full flex flex-col gap-3">
      {/* Row 1: Search Input + Location */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search franchises..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200 transition-all text-sm"
          />
        </div>

        {/* Location Dropdown */}
        <div className="relative w-full sm:w-48 shrink-0">
          <button
            type="button"
            onClick={() => {
              setShowLocationDropdown(!showLocationDropdown);
              setShowCategoryDropdown(false);
              setShowInvestmentDropdown(false);
            }}
            className="w-full h-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white hover:border-red-400 focus:border-red-600 focus:ring-2 focus:ring-red-200 text-left text-sm font-medium text-gray-700 flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-2 truncate">
              <MapPin size={16} className="text-gray-500 flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>
            <ChevronDown
              size={16}
              className={`text-gray-500 flex-shrink-0 transition-transform ${
                showLocationDropdown ? 'rotate-180' : ''
              }`}
            />
          </button>

          {showLocationDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-red-300 rounded-lg shadow-xl z-40 max-h-56 overflow-y-auto">
              {cities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    setLocation(city);
                    setShowLocationDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm border-b border-gray-100 last:border-b-0 transition-colors ${
                    city === location
                      ? 'bg-red-600 text-white font-semibold'
                      : 'hover:bg-red-50 text-gray-900'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Row 2: Category, Investment, Search Button */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        {/* Category Dropdown */}
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => {
              setShowCategoryDropdown(!showCategoryDropdown);
              setShowLocationDropdown(false);
              setShowInvestmentDropdown(false);
            }}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white hover:border-red-400 focus:border-red-600 focus:ring-2 focus:ring-red-200 text-left text-sm font-medium text-gray-700 flex items-center justify-between transition-all"
          >
            <span className="truncate">{category}</span>
            <ChevronDown
              size={16}
              className={`text-gray-500 flex-shrink-0 transition-transform ${
                showCategoryDropdown ? 'rotate-180' : ''
              }`}
            />
          </button>

          {showCategoryDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-red-300 rounded-lg shadow-xl z-40 max-h-56 overflow-y-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setCategory(cat);
                    setShowCategoryDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm border-b border-gray-100 last:border-b-0 transition-colors ${
                    cat === category
                      ? 'bg-red-600 text-white font-semibold'
                      : 'hover:bg-red-50 text-gray-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Investment Dropdown */}
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => {
              setShowInvestmentDropdown(!showInvestmentDropdown);
              setShowLocationDropdown(false);
              setShowCategoryDropdown(false);
            }}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white hover:border-red-400 focus:border-red-600 focus:ring-2 focus:ring-red-200 text-left text-sm font-medium text-gray-700 flex items-center justify-between transition-all"
          >
            <span className="truncate">{investment}</span>
            <ChevronDown
              size={16}
              className={`text-gray-500 flex-shrink-0 transition-transform ${
                showInvestmentDropdown ? 'rotate-180' : ''
              }`}
            />
          </button>

          {showInvestmentDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-red-300 rounded-lg shadow-xl z-40 max-h-56 overflow-y-auto">
              {investments.map((inv) => (
                <button
                  key={inv}
                  type="button"
                  onClick={() => {
                    setInvestment(inv);
                    setShowInvestmentDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm border-b border-gray-100 last:border-b-0 transition-colors ${
                    inv === investment
                      ? 'bg-red-600 text-white font-semibold'
                      : 'hover:bg-red-50 text-gray-900'
                  }`}
                >
                  {inv}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full sm:w-auto sm:min-w-[150px] px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm whitespace-nowrap shrink-0"
        >
          <Zap size={18} />
          <span>Search</span>
        </button>
      </div>
    </form>
  );
}
