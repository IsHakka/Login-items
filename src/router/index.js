import Layout from "../pages/Layout/Layout";
import Login from "../pages/Login/Login";
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([

    {
        path: "/",
        element: <Layout></Layout>,
    },
    {
        path: "login",
        element: <Login></Login>,
    },

]);

export default router;