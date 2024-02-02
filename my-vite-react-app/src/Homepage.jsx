import React, { useEffect, useRef, useState } from "react";
import { getProducts } from "./api/products";
import ProductCard from "./Components/Homepage/ProductCard";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const _products = await getProducts();
      setProducts(_products);
      setFilteredProducts(_products);
    };

    fetchProducts()
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();

    if (query.length > 0) {
      const _filteredProducts = products.filter(
        (p) => p.title.toLowerCase().indexOf(query) > -1
      );
      setFilteredProducts(_filteredProducts);
      setShowSearchResults(true);
    } else {
      setFilteredProducts(products);
      setShowSearchResults(false);
    }
  };

  if (error) {
    return <h1>{error.message}</h1>;
  } else if (loading) {
    return <h1>Please wait...</h1>;
  } else {
    return (
      <div className="container mx-auto my-10 p-5">
        <h2 className="text-4xl text-center font-bold mb-5">Products</h2>
        <div className="mb-4 group">
          <input
            onKeyUp={handleSearch}
            type="search"
            className="px-4 py-2 border border-gray-300 rounded w-full"
            placeholder="What are you looking for?"
          />
          {filteredProducts.length > 0 && showSearchResults && (
            <div className="relative hidden group-focus-within:block">
              <div className="absolute w-full shadow-2xl max-h-52 overflow-y-scroll">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    className="block w-full bg-white hover:bg-blue-600 hover:text-white transition-colors p-4"
                    to={`product/${product.id}`}
                  >
                    {product.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  }
};

export default HomePage;
