import { Link } from 'react-router-dom';
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product-list/components/ProductList";

function Home() {
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
        <ProductList />
      </Navbar>
    </>
  );
}

export default Home;
