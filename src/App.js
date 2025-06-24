import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, DollarSign } from 'lucide-react';

import blackDress from './images/black-slatin.jpg';
import bootsBlack from './images/boots-3-black.jpg';
import blueDress from './images/dress-blue.jpg';
import blackHeels from './images/heels-6-black.jpg';
import maroonDress from './images/maroon-slatin.jpg';
import pendantPink from './images/pendant-7-dark-pink.jpg';
import blackTop from './images/tops-black.jpg';
import blackBag from './images/bag-9-black.jpg';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackProducts = [
    {
      id: 1,
      title: "Elegant Black Satin Dress",
      description: "A sleek, body-hugging satin dress perfect for date nights or parties. Soft fabric and luxurious finish.",
      price: 129.99,
      category: "Fashion",
      image: blackDress,
    },
    {
      id: 2,
      title: "Chic Black Boots",
      description: "Edgy and stylish, these black boots complement every outfit with attitude and class.",
      price: 89.99,
      category: "Footwear",
      image: bootsBlack,
    },
    {
      id: 3,
      title: "Royal Blue Flare Dress",
      description: "Flattering sleeveless flare dress with rich blue hue. Perfect for semi-formal and casual outings.",
      price: 109.99,
      category: "Fashion",
      image: blueDress,
    },
    {
      id: 4,
      title: "Bold Maroon Satin Dress",
      description: "Confidence meets elegance. This maroon satin dress hugs your curves and steals attention.",
      price: 139.99,
      category: "Fashion",
      image: maroonDress,
    },
    {
      id: 5,
      title: "Strappy Black Heels",
      description: "Elegant black heels with a bold strappy design — height, comfort, and power combined.",
      price: 74.99,
      category: "Footwear",
      image: blackHeels,
    },
    {
      id: 6,
      title: "Glossy Black Crop Top",
      description: "Satin-sheen crop top perfect for pairing with skirts, trousers, or layered jackets.",
      price: 49.99,
      category: "Tops",
      image: blackTop,
    },
    {
      id: 7,
      title: "Dark Pink Pendant Necklace",
      description: "Glam up with this beautiful heart pendant in pink. Great for gifting or adding shine to your look.",
      price: 59.99,
      category: "Accessories",
      image: pendantPink,
    },
    {
      id: 8,
      title: "Stylish Black Handbag",
      description: "A compact, rounded handbag with gold-chain strap. Chic and functional for daily use.",
      price: 89.99,
      category: "Bags",
      image: blackBag,
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        setProducts(fallbackProducts);
        setFilteredProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <ShoppingBag className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">Product Store</h1>
          </div>
          <p className="text-gray-600">Discover amazing products at great prices</p>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 text-center">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h2 className="text-xl font-semibold text-gray-600 mb-2">No products found</h2>
            <p className="text-gray-500">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                {product.image && (
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain p-4"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-xl font-bold text-green-600">
                        {typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                      </span>
                    </div>
                    {product.category && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {product.category}
                      </span>
                    )}
                  </div>
                  <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
