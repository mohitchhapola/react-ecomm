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
    <Navbar>
        <ProductList></ProductList>
    </Navbar>
  )

}

export default Home