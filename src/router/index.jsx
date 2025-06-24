import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import SignUp from '../pages/SingUp.jsx';
import LogIn from '../pages/LogIn';
import Wishlist from '../pages/Wishlist'

// import Account from '../pages/Account';
// import ProductDetails from '../pages/ProductDetailsPage';
// import NotFound from '../pages/NotFound';


export default function RouterView() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singup" element={<SignUp />} />
       <Route path="/login" element={<LogIn />} />
       <Route path="/wishlist" element={<Wishlist />} />

        {/* <Route path="/account" element={<Account />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />  */}
      </Routes>
  );
}