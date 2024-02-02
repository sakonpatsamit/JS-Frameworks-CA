import { createContext, useState } from "react";

export const CartContext = createContext();

const getCart = () => {
  const _cart = localStorage.getItem("cart");
  if (_cart) return JSON.parse(_cart);
  return [];
};

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getCart());

  const addItem = (productId) => {
    const _cart = getCart();
    const match = _cart.find((p) => p.id == productId);

    if (match) match.quantity += 1;
    else _cart.push({ id: productId, quantity: 1 });

    localStorage.setItem("cart", JSON.stringify(_cart));
    setCartItems(_cart);
  };

  const removeItem = (productId) => {
    const _cart = cartItems.filter((p) => p.id != productId);
    localStorage.setItem("cart", JSON.stringify(_cart));
    setCartItems(_cart);
  };

  const itemCount = () => {
    let q = 0;
    cartItems.forEach((item) => (q += item.quantity));
    return q;
  };

  const context = {
    cart: cartItems,
    itemCount: itemCount,
    addItem: addItem,
    removeItem: removeItem,
  };

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}
