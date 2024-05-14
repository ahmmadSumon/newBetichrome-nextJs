// components/Cart.tsx
'use client'
import React, { useMemo } from 'react';
import { useCartStore } from '../store/page'; // Import the useCartStore hook

// Add the 'use client' directive to mark this as a client-side component
// @ts-ignore
// @use-client
const CartPage: React.FC = () => {
  // Get the items array from the useCartStore hook
  const cartItems = useCartStore(state => state.items);
  const removeItemFromCart = useCartStore(state => state.removeItem); // Get removeItem function
  const incrementQuantity = useCartStore(state => state.incrementQuantity); // Get incrementQuantity function
  const decrementQuantity = useCartStore(state => state.decrementQuantity); // Get decrementQuantity function

  // Calculate total price
  const total = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [cartItems]);

  // Function to handle buying all items in the cart
  const handleBuyNow = () => {
    // Your logic to handle the buy now action
    alert('Buy Now clicked!');
  };

  return (
    <div className="container mx-auto px-4 py-32">
      <h2 className="text-3xl font-semibold mb-8">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="grid grid-cols-1 gap-6">
            {cartItems.map((item, index) => (
              <li key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.title} width={100} height={100} className="w-16 h-16 rounded-full mr-4" />
                    <div className='max-w-[5rem]'>
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-600 mb-2">Base Price: ${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <button
                      className="text-indigo-500 hover:text-indigo-700 focus:outline-none border border-indigo-500 px-2 py-1 rounded"
                      onClick={() => decrementQuantity(index)}
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold w-auto text-center">Quantity: {item.quantity}</span>
                    <button
                      className="text-indigo-500 hover:text-indigo-700 focus:outline-none border border-indigo-500 px-2 py-1 rounded"
                      onClick={() => incrementQuantity(index)}
                    >
                      +
                    </button>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-lg font-semibold ml-10 mb-2">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                      onClick={() => removeItemFromCart(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-end mt-4">
            <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
          </div>
        </div>
      )}
      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default CartPage;
