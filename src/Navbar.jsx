import React, { useContext } from "react";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { CartContext } from "./utils/CartProvider";

const Navbar = () => {
  const { itemCount } = useContext(CartContext);

  return (
    <nav className="bg-blue-800 text-white w-full py-5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/">
            <div className="text-3xl font-bold">UseGoods</div>
          </Link>
          <div className="flex items-center">
            <div className="lg:flex lg:space-x-4">
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
              <a href="form" className="hover:text-gray-300 ml-2 md:ml-4">
                Contact
              </a>
            </div>
            <Link to="/cart" className="relative ml-4">
              <ShoppingCartIcon className="h-8 w-8" />
              {itemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {itemCount()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
