import { NavLink, Outlet } from "react-router-dom";

export default function Account() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
      {/* Sidebar */}
      <aside className="w-1/4 space-y-2 text-sm">
        <h3 className="font-semibold text-lg mb-2">Manage My Account</h3>

        <NavLink to="profile"
         className={({ isActive })  =>
    `block px-2 py-1 rounded hover:bg-gray-100 ${isActive ? 'text-red-500 font-semibold' : 'text-gray-700'}`
  }>My Profile</NavLink>

        <NavLink to="address" 
               className={({ isActive })  =>
    `block px-2 py-1 rounded hover:bg-gray-100 ${isActive ? 'text-red-500 font-semibold' : 'text-gray-700'}`
  }>Address Book</NavLink>

        <NavLink to="payment" 
                 className={({ isActive })  =>
    `block px-2 py-1 rounded hover:bg-gray-100 ${isActive ? 'text-red-500 font-semibold' : 'text-gray-700'}`
  }>My Payment Options</NavLink>
        
                <h3 className="font-semibold text-lg mb-2">My Orders</h3>

        <NavLink to="returns"
         className={({ isActive })  =>
    `block px-2 py-1 rounded hover:bg-gray-100 ${isActive ? 'text-red-500 font-semibold' : 'text-gray-700'}`
  }>My Returns</NavLink>

        <NavLink to="cancellations" 
               className={({ isActive })  =>
    `block px-2 py-1 rounded hover:bg-gray-100 ${isActive ? 'text-red-500 font-semibold' : 'text-gray-700'}`
  }>My Cancellations</NavLink>

  <h3 className="font-semibold text-lg mb-2">My Wishlist</h3>
      </aside>



      {/* Content from nested route */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
