import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { Login } from "./page/Login.tsx";
import { Home } from "./page/Home.tsx";
import { Register } from "./page/Register.tsx";
import { Register } from "./page/Profile.tsx";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "*",
      element: <div>404</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;