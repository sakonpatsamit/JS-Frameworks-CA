import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "./utils/CartProvider";
import { getProductById } from "./api/products";

const CartPage = () => {
  const { cart, removeItem } = useContext(CartContext);
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      let _products = [];
      let _totalPrice = 0;

      for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        const _product = await getProductById(item.id);
        _products.push({ ..._product, quantity: item.quantity });
        _totalPrice += item.quantity * _product.discountedPrice;
      }

      return { products: _products, price: _totalPrice };
    };

    fetchProducts()
      .then((val) => {
        setProducts(val.products);
        setTotalPrice(val.price);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cart]);

  const handleGoToCheckout = () => {
    localStorage.removeItem("cart");
    navigate("/checkout");
    window.location.reload();
  };

  if (error) {
    return <h1>Error</h1>;
  } else if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-4xl font-bold mb-5">Your Cart</h2>
      <div className="bg-gray-100 p-4">
        {products.length > 0 &&
          products.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-4 border-b border-gray-300"
            >
              <div className="flex items-center flex-grow">
                <img
                  className="h-16 w-16 object-cover"
                  src={item.imageUrl}
                  alt={item.title}
                />
                <h3 className="text-lg ml-4">{item.title}</h3>
              </div>

              <div className="text-lg flex items-center">
                <span className="font-bold">
                  ${item.discountedPrice.toFixed(2)}
                </span>
                <span className="ml-2">x {item.quantity}</span>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                X
              </button>
            </div>
          ))}
        {products.length === 0 && (
          <div className="bg-red-100 text-red-900 border border-red-300 p-4">
            <h3 className="m-0 font-semibold">Your cart is empty</h3>
          </div>
        )}
      </div>
      <div className="text-2xl font-bold my-5">
        Total Price:{" "}
        <span className="text-green-500">${totalPrice.toFixed(2)}</span>
      </div>
      {products.length > 0 && (
        <button
          onClick={handleGoToCheckout}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-sm  block"
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default CartPage;
