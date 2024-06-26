import { Link, useParams,Navigate } from "react-router-dom"
import Navbar from "../features/navbar/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { resetCartAsync } from "../features/cart/cartSlice"
import { selectloggedInUser } from "../features/auth/authSlice"
import { resetOrder } from "../features/order/orderSlice"



function OrderSuccessPage() {
  const params = useParams()

  const dispatch = useDispatch()
  const user = useSelector(selectloggedInUser)


  useEffect(()=>{
    // console.log(user.id)
    // dispatch(resetCartAsync(user.id))
    dispatch(resetOrder())
  },[dispatch,user])
  return (
    <Navbar>
      {!params.id && <Navigate to='/' replace={true}></Navigate>}
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div className="text-center">
      <p className="text-5xl font-semibold text-indigo-600">Thank You</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Order Placed Successfully</h1>
      <p className="mt-6 text-base leading-7 text-gray-600">Your Order Number Is #{params?.id}</p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          to="/"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Go back home
        </Link>
        <Link
          to="/orders"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Your Orders
        </Link>
       
      </div>
    </div>
  </main>
  </Navbar>
  )
}

export default OrderSuccessPage