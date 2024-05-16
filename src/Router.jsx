import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Components/Home/Home";
import Blogs from "./Components/Blogs/Blogs";
import Not_Finished from "./Components/Not_Finished";
import Not_Found from "./Components/Not_Found";
import Register from "./Components/Auth/Register/Register";
const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                // path: "/",
                index: true,
                element: <Home />,
            },
            {
                path: "/Blogs",
                element: <Not_Finished />,
            },
            {
                path: "/Contact",
                element: <Not_Finished />,
            },
            {
                path: "/About",
                element: <Not_Finished />,
            },
            {
                path: "/FAQ",
                element: <Not_Finished />,
            },
            {
                path: "*",
                element: <Not_Found />,
            },
            {
                path: "/Register",
                element: <Register />,
            },
            {
                path: "/Login",
                element: <Not_Finished />,
            },
        ],
    },

    {
        path: "/Profile/:id",
        element: <Not_Finished />,
    },
    {
        path: "/Dashboard/:id",
        element: <Not_Finished />,
    },
    {
        path: "*",
        element: <Not_Found />,
    },
]);
export default routes;
