import GeekLayout from "../pages/Layout/Layout";
import Login from "../pages/Login/Login";
import { createBrowserRouter } from 'react-router-dom';
import { AuthRoute } from "../components/AuthRoute";
import Home from "../pages/Home/Home";
import Article from "../pages/Article/Article";
import Publish from "../pages/Publish/Publish";

const router = createBrowserRouter([

    {
        path: "/",
        element: <AuthRoute><GeekLayout></GeekLayout></AuthRoute>,
        children: [{
            path: '',
            element: <Home></Home>
        }, {
            path: 'article',
            element: <Article></Article>
        }, {
            path: 'publish',
            element: <Publish></Publish>
        }]
    },
    {
        path: "login",
        element: <Login></Login>,
    },

]);

export default router;