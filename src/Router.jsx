import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Components/Home/Home";
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
        ],
    },
]);
export default routes;
