import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import ActiveSale from "../Pages/ActiveSale/ActiveSale";
import CompleteSale from "../Pages/CompleteSale/CompleteSale";
import PrivateRoute from "./PrivateRoute";


const Router = createBrowserRouter([
    {
        path: '/',
        element:<MainLayout/>,
        errorElement: <Error/>,
        children: [
            {
                path:'/',
                element: <Home/>
            },
            {
                path:'/active-sale',
                element:<PrivateRoute><ActiveSale/></PrivateRoute> 
            },
            {
                path:'/complete-sale',
                element:<PrivateRoute><CompleteSale/></PrivateRoute> 
            },
            {
                path:'login',
                element:<Login/>
            }
        ]
    }

])

export default Router;

