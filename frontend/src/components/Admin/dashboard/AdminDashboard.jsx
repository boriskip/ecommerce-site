import ProductList from '../Products/ProductList';
import NewArrivalsList from '../NewArrivals/NewArrivalsList';


export default function AdminDashboard() {

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Админ-панель</h1>
            {/* Можно позже добавить табы или меню */}
            <ProductList />
            <NewArrivalsList />
        </div>

    );
}
