import ProductList from '../Products/ProductList';
import NewArrivalsList from '../NewArrivals/NewArrivalsList';
import AdminFooter from '../footer/AdminFooter';
import AdminHeader from '../header/AdminHeader';
import AdminHero from '../hero/AdminHero';
import FlashSalesList from '../flash-sale/FlashSalesList';

export default function AdminDashboard() {

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Админ-панель</h1>
            {/* Можно позже добавить табы или меню */}
            <AdminHeader />
            <AdminHero />
            <FlashSalesList />
            <ProductList />
            <NewArrivalsList />
            <AdminFooter />
        </div>

    );
}
