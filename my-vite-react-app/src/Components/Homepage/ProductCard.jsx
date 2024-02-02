import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  let discount = 0;

  if (product.price > product.discountedPrice) {
    discount = Math.round((1 - product.discountedPrice / product.price) * 100);
  }

  const [discountPercentage] = useState(discount);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-100 flex flex-col">
      <div
        style={{
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          className="w-full h-full object-cover"
          src={product.imageUrl}
          alt={product.name}
        />
      </div>
      <div className="px-6 py-4 flex flex-col flex-grow">
        <div className="font-bold text-xl mb-2">{product.title}</div>
        <div className="flex-1">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Rating: {product.rating}
          </span>
          <div className="mb-2">
            {discountPercentage > 0 ? (
              <>
                <div className="text-sm">
                  Before: <span className="line-through">{product.price}</span>
                </div>
                <div className="text-lg">
                  Now:
                  <span className="text-red-500">
                    {product.discountedPrice}
                  </span>
                </div>
                <div className="text-sm">Sale: {discountPercentage}%</div>
              </>
            ) : (
              <div className="text-lg">
                Price: <span>{product.price}</span>
              </div>
            )}
          </div>
        </div>
        <Link
          to={`product/${product.id}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-start mt-auto"
        >
          View Product
        </Link>
      </div>
    </div>
  );
}
