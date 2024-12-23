import React, { useEffect } from 'react';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import {
  createBrowserRouter,
  RouterProvider,Route,Link
} from "react-router-dom";
import CartPage from './pages/CartPage'; 
import Checkout from './pages/Checkout';
import PagenotFound from './pages/404';
import ProductDetailpage from './pages/ProductDetailpage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { autoLoginAsync, selectloggedInUser } from './features/auth/authSlice';
import { fetchItemByUserIdAsync } from './features/cart/cartSlice';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrders from './features/users/component/UserOrders';
import UserProfile from './features/users/component/UserProfile';
import Logout from './features/auth/components/Logout'
import StripeCheckout from './pages/stripeCheckout';
const router = createBrowserRouter([
  {
    path: "/",
    element:
     <Protected>
      <Home></Home>
       </Protected>
      ,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: 
    // <Protected>
      <CartPage></CartPage>
    // </Protected>,
  },
  {
    path: "/checkout",
    element:
    //  <Protected>
    <Checkout></Checkout>
  // </Protected>,
  },
  {
    path: "/product-detail/:id",
    element: 
    <ProductDetailpage></ProductDetailpage>
  ,
  },
  {
    path: "*",
    element: <PagenotFound></PagenotFound>,
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage></OrderSuccessPage>,
  },
  {
    path: "/orders",
    element: <UserOrders></UserOrders>,
  },
  {
    path: "/users",
    element: <UserProfile></UserProfile>,
  },
  {
    path:"/logout",
    element: <Logout></Logout>
  },
  {
    path: '/stripe-checkout/',
    element: (
      // <Protected>
        <StripeCheckout></StripeCheckout>
      // {/* </Protected> */}
    )
  },
]);

function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectloggedInUser)

  useEffect(()=>{
    // dispatch(autoLoginAsync())
    if(user){
      dispatch(fetchItemByUserIdAsync(user.id))
    }
  },[dispatch,user])
  return (
    <div className="App ">
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
