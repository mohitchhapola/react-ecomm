import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, Navigate } from "react-router-dom"
import { deleteItemFromCartAsync, selectItems, updateCartAsync } from "../features/cart/cartSlice";
import { useForm } from "react-hook-form";
import { selectUserInfo } from "../features/users/userSlice";
import {  selectloggedInUser, updateUserAsync } from "../features/auth/authSlice";
import { updateUser } from "../features/auth/authAPI";
import { addOrderAsync, selectCurrentOrder } from "../features/order/orderSlice";


  // const addresses = [
  //   { 
  //       "id": 1,
  //       "firstName": "Terry",
  //       "lastName": "Medhurst",
  //       "age": 50,
  //       "gender": "male",
  //       "email": "atuny0@sohu.com",
  //       "address": "1745 T Street Southeast",
  //       "city": "Washington",
  //       "postalCode": "20020",
  //       "state": "DC",
  //       "phone": "+63 791 675 8914"
  //   }
  // ]
function Checkout() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }, 
  } = useForm();
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true)
  const [selectAddress, setSelectAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("Cash")
  const user = useSelector(selectloggedInUser)
  const currentOrder = useSelector(selectCurrentOrder)

  const totalAmount = items.reduce(
    (amount, item) => item.product.price * item.quantity + amount,
    0
  );
  const deliveryCharges = 50;
  const finalPrice = totalAmount + deliveryCharges;
  const totalItem = items.reduce(
    (total, item) =>  item.quantity + total,
    0
  );

  // console.log(items)
  const handleRemove = (e,id)=>{
    // console.log(id)
    dispatch(deleteItemFromCartAsync(id))
  }
 
  const handleAddress = (e) =>{
    // console.log(user.addresses[e.target.value])
    setSelectAddress(user.addresses[e.target.value])
  } 
  const handlePayment = (e) =>{
    // console.log(e.target.value)
    setPaymentMethod(e.target.value)
  } 
  
  const handleQuantity=(e,item)=>{
    dispatch(updateCartAsync({id:item.id,quantity: +e.target.value}))
  }

  const handleOrder = async() =>{
    if(selectAddress && paymentMethod){
      let order_id = Date.now().toString(36) + user.id
      // let order_id = date
      const order = {
        orderId: order_id,
        items,
        totalAmount,
        totalItem,
        user: user.id,
        paymentMethod,
        selectAddress,
        status: 'pending', // other status can be delivered, received.
      };
      console.log(order)
      dispatch(addOrderAsync(order));
      // navigate(`/order-success/${order.orderId}`);
  }
  else
  {
    console.log("Add Payment and Address")
  }
};
  return (
  <>
  {!items.length && <Navigate to="/" replace={true}></Navigate>}
  {currentOrder && currentOrder.paymentMethod === 'cash' && (
    <Navigate
    to={`/order-success/${currentOrder.orderId}`}
    replace={true}
    ></Navigate>
    )}
  {currentOrder && currentOrder.paymentMethod === 'card' && (
      <Navigate to={`/stripe-checkout/`} replace={true}></Navigate>
    )}
  <div className="mx-auto  max-w-7xl px-4 sm:px-6 lg:px-11">
<div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
    <div className="lg:col-span-3">
   <form 
   noValidate
   
   className="bg-white px-5">
   <div className="space-y-12 py-16">
        
   <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive Order.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('name', {
                    required: 'name is required',
                  })}
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name && (
                          <p className="text-red-500">{errors.name.message}</p>
                        )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register('email', {
                    required: 'mail is required',
                  })}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                          <p className="text-red-500">{errors.email.message}</p>
                        )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  {...register('phone', {
                    required: 'phone is required',
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {errors.phone && (
                          <p className="text-red-500">{errors.phone.message}</p>
                        )}
                  
                </input>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('street', {
                    required: 'street is required',
                  })}
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.street && (
                          <p className="text-red-500">{errors.street.message}</p>
                        )}
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('city', {
                    required: 'city is required',
                  })}
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.city && (
                          <p className="text-red-500">{errors.city.message}</p>
                        )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('state', {
                    required: 'state is required',
                  })}
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.state && (
                          <p className="text-red-500">{errors.state.message}</p>
                        )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('zip', {
                    required: 'zip is required',
                  })}
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.zip && (
                          <p className="text-red-500">{errors.zip.message}</p>
                        )}
              </div>
            </div>
          </div>
        </div>
        

        <div className="border-b border-gray-900/10 pb-12">
        <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleSubmit((data)=>{
          dispatch(
            updateUserAsync({...user,addresses:[...user.addresses,data]})
          )
        })}>
          Add Address
        </button>
        <button
          type="submit"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
      </div>
      <fieldset>
  <legend className="text-sm font-semibold leading-6 text-gray-900">Address</legend>
  <p className="mt-1 text-sm leading-6 text-gray-600">Choose from existing</p>
  <ul>
                {user.addresses.map((address, index) => (
                  <li
                    key={index}
                    className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                  >
                    <div className="flex gap-x-4">
                      <input
                        onChange={handleAddress} 
                        name="address"
                        type="radio"  
                        value={index}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {address.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address.street}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address.pinCode}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        Phone: {address.phone}
                      </p>
                      <p className="text-sm leading-6 text-gray-500">
                        {address.city}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
</fieldset>

                <br />
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">Choose Your method</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="cash-payment"
                    onChange={handlePayment}
                    name="payment"
                    type="radio"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                    Cash On Delivery
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="card-payment"
                    onChange={handlePayment}
                    name="payment"
                    type="radio"
                    value="card"
                    checked={paymentMethod === 'card'}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                    Card Payment
                  </label>
                </div>
                
                
              </div>
            </fieldset>
          </div>
        </div>
      

      
      
   </form>
   </div>
   <div className="lg:col-span-2 ">
   <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className='text-3xl font-bold tracking-tight text-gray-900'>Cart</h1>
       <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flow-root">
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
                                    <div className="flex flex-2 justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={item.product.href}>{item.product.name}</a>
                                      </h3>
                                      <p className="ml-4">Rs.{item.product.price}</p>
                                     
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{item.color1},{item.size1}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
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
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={(e)=>handleRemove(e,item.id)}
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
                        <p>Total Items in Cart</p>
                        <p>{totalItem} items</p>
                      </div>
                      <div className="flex justify-between text-base font-bold tracking-tight text-gray-900">
                        <p>Subtotal</p>
                        <p>Rs. {totalAmount}</p>
                      </div>
                      <div className="flex justify-between text-base font-bold tracking-tight text-gray-900">
                        <p>Delivery Charges</p>
                        <p>Rs. {deliveryCharges}</p>
                      </div>
                      <div className="flex justify-between text-base font-bold tracking-tight text-gray-900">
                        <p>Final Price</p>
                        <p>Rs. {finalPrice}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <div
                        onClick={handleOrder} 
                          // to="/checkout"
                          className="flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Order Now
                        </div>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          
                          <Link
                            to="/"
                            className="font-medium  text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </Link>
                        </p>
                      </div>
                    </div>
                    </div>
   </div>
   </div>
   </div>
   </>
  )}

  

export default Checkout;