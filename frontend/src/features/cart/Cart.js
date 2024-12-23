import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link,Navigate } from 'react-router-dom';
import { Grid } from 'react-loader-spinner';
import { deleteItemFromCartAsync, fetchItemByUserIdAsync, selectCartLoaded, selectCartStatus, selectItems, updateCartAsync } from './cartSlice';
import { selectloggedInUser } from '../auth/authSlice';

export default function Cart() {
  const items = useSelector(selectItems) || []; // Default to an empty array
  const dispatch = useDispatch();
  const status = useSelector(selectCartStatus);
  const cartLoaded = useSelector(selectCartLoaded)
  const user = useSelector(selectloggedInUser);


  const [open, setOpen] = useState(true);

  // Calculate totals
  // console.log(items)
  const totalAmount = items.reduce(
    (amount, item) => item.product.price * item.quantity + amount,
    0
  );
  const totalItem = items.reduce((total, item) => item.quantity + total, 0);

  // Debugging
  // console.log("Cart Items:", items);
  // console.log("Removing item with ID:",items[0].id);

  const handleRemove = (e, id) => {
    // console.log("Removing item with ID:", id);
    dispatch(deleteItemFromCartAsync(items[0].id));
  };

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };
  // console.log(user)

  useEffect(() => {
    if (user.user.id) {
      dispatch(fetchItemByUserIdAsync(user.user.id));
    }
  }, [dispatch, user.id]);

  return (
    <>
    <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Cart</h1>
      {cartLoaded && items.length === 0 ? (
        <div className="mt-10 text-center">
          <p className="text-xl font-semibold text-gray-700">Your cart is empty</p>
          <Link
            to="/"
            className="mt-4 inline-block rounded-md bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flow-root">
              {status === 'loading' ? (
                <Grid
                  height="80"
                  width="80"
                  color="rgb(79, 70, 229)"
                  ariaLabel="grid-loading"
                  radius="12.5"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              ) : null}
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.product.imageSrc}
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={item.product.href}>{item.product.name}</a>
                          </h3>
                          <p className="ml-4">Rs. {item.product.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.product.color1}, {item.product.size1}
                        </p>
                      </div>
                      <div className="flex items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty
                          </label>
                          <select
                            onChange={(e) => handleQuantity(e, item)}
                            value={item.quantity}
                          >
                            {[1, 2, 3, 4, 5].map((qty) => (
                              <option key={qty} value={qty}>
                                {qty}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={(e) => handleRemove(e, item.product.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-bold tracking-tight text-gray-900">
              <p>Subtotal</p>
              <p>Rs. {totalAmount}</p>
            </div>
            <div className="flex justify-between text-base font-bold tracking-tight text-gray-900">
              <p>Total Items in Cart</p>
              <p>{totalItem} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                <Link
                  to="/"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  </>
  
  );
}
