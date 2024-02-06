import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Checkout from "./components/checkoutComponent";
import ShopCart from "./components/ShopCartComponent";
import ProductsDetail from "./components/productsDetail";
import Register from "./components/Register";
import Login from "./components/Login";
import Error from "./components/Error";
import Collections from "./components/Collections";
import Contactus from "./components/Contactus";
import Products from "./components/Products";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="shopcart" element={<ShopCart />} />
        <Route path="contact" element={<Contactus />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductsDetail />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="error/:message" element={<Error />} />
        <Route path="collections" element={<Collections />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
