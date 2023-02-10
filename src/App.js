import "./App.css";
import Registration from "./pages/Registration";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Login from "./pages/Login";

let router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Registration />} />
      <Route path="/login" element={<Login />} />
    </>
  )
);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
