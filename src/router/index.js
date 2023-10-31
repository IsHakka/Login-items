import GeekLayout from "../pages/Layout/Layout";
import Login from "../pages/Login/Login";
import { createBrowserRouter } from 'react-router-dom';
import { AuthRoute } from "../components/AuthRoute";
import { Suspense, lazy } from "react";

// 懶加載
const Home = lazy(() => import('./../pages/Home/Home.jsx'));
const Article = lazy(() => import('./../pages/Article/Article.jsx'))
const Publish = lazy(() => import('./../pages/Publish/Publish.jsx'));

const router = createBrowserRouter([

    {
        path: "/",
        element: <AuthRoute><GeekLayout></GeekLayout></AuthRoute>,
        children: [{
            path: '',
            element: <Suspense fallback={'加載中'}><Home></Home></Suspense> 
        }, {
            path: 'article',
            element: <Suspense fallback={'加載中'}><Article></Article></Suspense> 
        }, {
            path: 'publish',
            element: <Suspense fallback={'加載中'}><Publish></Publish></Suspense> 
        }]
    },
    {
        path: "login",
        element: <Login></Login>,
    },

]);

export default router;