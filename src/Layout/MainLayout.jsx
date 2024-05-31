import { Outlet } from "react-router-dom";
import Footer from "../components/Shared/Footer/Footer";
import Navbar from "../components/Shared/Navbar/Navbar";
import '../App.css'
import Navbar2 from "../components/Shared/Navbar/Navbar2";
import { OrdersProvider } from "../Hooks/useOrders";


const MainLayout = () => {
    return (
        <OrdersProvider>
            <div>
                <Navbar />
                <div className="min-h-screen pt-24 w-10/12 mx-auto">
                    <Navbar2 />
                    <Outlet />
                </div>
                <Footer />
            </div>
        </OrdersProvider>
    );
};

export default MainLayout;
