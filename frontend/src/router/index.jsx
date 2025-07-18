import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import SignUp from '../pages/SignUp.jsx';
import LogIn from '../pages/LogIn';
import Wishlist from '../pages/Wishlist'
import Cart from "../pages/Cart.jsx";
import Checkout from "../pages/Checkout.jsx";
import Account from '../pages/Account';
import MyProfile from '../pages/account/MyProfile';
import AddressBook from '../pages/account/AddressBook';
import PaymentOptions from '../pages/account/PaymentOptions';
import MyOrders from "../pages/account/MyOrders.jsx";
import MyReturns from "../pages/account/MyReturns";
import MyCancellations from "../pages/account/MyCancellations";
import MyWishlist from "../pages/account/MyWishlist";
import MyReviews from "../pages/MyReviews.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";
import NotFound from '../pages/NotFound';
import AdminLayout from "../layouts/AdminLayout.jsx";
import AdminLogin from "../components/Admin/AdminLogin.jsx";
import ProtectedRoute from '../components/ProtectedRoute';
import AdminDashboard from "../components/Admin/dashboard/AdminDashboard.jsx";
import SuccessPage from "../pages/SuccessPage";
import SearchResults from "../pages/SearchResults";

export default function RouterView({ user, setUser }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/reviews" element={<MyReviews />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/product/:id" element={<ProductDetails />} />

      <Route path="/account" element={<Account />}>
        <Route path="profile" element={<MyProfile />} />
        <Route path="address" element={<AddressBook />} />
        <Route path="payment" element={<PaymentOptions />} />
        <Route path="orders" element={<MyOrders />} />
        <Route path="returns" element={<MyReturns />} />
        <Route path="reviews" element={<MyReviews />} />
        <Route path="cancellations" element={<MyCancellations />} />
        <Route path="wishlist" element={<MyWishlist />} />
      </Route>

      <Route path="/search" element={<SearchResults />} />

      <Route path="/admin/*" element={<AdminLayout />}>
        <Route path="login" element={<AdminLogin setUser={setUser} />} />

        <Route
          path="dashboard"
          element={
            <ProtectedRoute isAuthenticated={user !== null}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}