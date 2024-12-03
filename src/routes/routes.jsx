import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddProduct from "../pages/AddProduct/AddProduct";
import BannerManagement from "../pages/Banner/Banner";
import Categories from "../pages/Category/Categories";
import DashboardManagement from "../pages/Dashboard/DashboardManagement";
import Login from "../pages/Login/Login";
import Orders from "../pages/Orders/Orders";
import Products from "../pages/Products/Products";
import UpdateProduct from "../pages/UpdateProduct/UpdateProduct";
import Users from "../pages/Users/Users";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <DashboardManagement />
			},
			{
				path: "/banners",
				element: <BannerManagement />
			},
			{
				path: "/products",
				element: <Products />
			},
			{
				path: "/add-product",
				element: <AddProduct />
			},
			{
				path: "/update-product",
				element: <UpdateProduct />
			},
			{
				path: "/categories",
				element: <Categories />
			},
			{
				path: "users",
				element: <Users />
			},
			{
				path: "orders",
				element: <Orders />
			}
		]
	},
	{
		path: "/login",
		element: <Login />
	}
]);

export default router;
