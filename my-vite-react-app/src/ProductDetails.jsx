import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "./api/products";
import { CartContext } from "./utils/CartProvider";

export default function ProductDetails() {
  const { addItem } = useContext(CartContext);
  const { productId } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const _product = await getProductById(productId);
        setProduct(_product);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const addToCart = () => {
    addItem(productId);
  };

  let discountPercentage = 0;
  if (product && product.price > product.discountedPrice) {
    discountPercentage = Math.round(
      (1 - product.discountedPrice / product.price) * 100
    );
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error}
      </div>
    );

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded overflow-hidden shadow-lg bg-gray-100 flex flex-col m-4">
        <div
          style={{
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            className="h-full w-full object-cover"
            src={product.imageUrl}
            alt={product.title}
          />
        </div>
        <div className="px-6 py-4 flex flex-col">
          <h1 className="font-bold text-2xl mb-2">{product.title}</h1>
          <p className="text-gray-700 text-base mb-4">{product.description}</p>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Rating: {product.rating}
          </span>
          <div className="mb-4">
            {discountPercentage > 0 ? (
              <>
                <div className="text-sm">
                  Before: <span className="line-through">{product.price}</span>
                </div>
                <div className="text-xl text-red-500">
                  Now: {product.discountedPrice}
                </div>
                <div className="text-sm">Sale: {discountPercentage}% off</div>
              </>
            ) : (
              <div className="text-lg">
                Price: <span>{product.price}</span>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Go Back
            </Link>
            <button
              onClick={addToCart}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
