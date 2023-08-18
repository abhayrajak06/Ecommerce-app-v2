import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import About from "./pages/About";
import Pagenotfound from "./pages/Pagenotfound";
import Developer from "./pages/Developer";
import Register from "./pages/Auth/Register";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path={"/contact"} element={<Contact />} />
        <Route path={"/policy"} element={<Policy />} />
        <Route path={"/about"} element={<About />} />
        <Route path={"/developer"} element={<Developer />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path={"/*"} element={<Pagenotfound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
