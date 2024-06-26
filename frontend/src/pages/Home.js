import { Link } from 'react-router-dom';
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product-list/components/ProductList";
// import { autoLogin } from "../features/auth/authUtils";

function Home() {
  
  // Import the autoLogin function

// When your application loads, call the autoLogin function
// autoLogin()
//   .then((response) => {
//     // User successfully logged in, response contains user data
//     console.log('User logged in:', response.data);
//     // Navigate the user to the authenticated section of your application
//     // For example:
//     // history.push('/dashboard');
//   })
//   .catch((error) => {
//     // No user logged in or error occurred while auto-login
//     console.log('Auto-login failed:', error.message);
//     // Optionally, redirect the user to the login page
//     // For example:
//     // history.push('/login');
//   });

  return (
<>
        <Link
              to="/users"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              User Profile
            </Link>
            <Link
          to="/orders"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Your Orders
        </Link>
            <Link
          to="/logout"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Logout
        </Link>
    <Navbar>
        <ProductList></ProductList>
    </Navbar>
    </>
  )

}

export default Home