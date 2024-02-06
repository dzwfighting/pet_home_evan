import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Checkout from "./components/checkoutComponent";
import ShopCart from "./components/ShopCartComponent";
import ProductsDetail from "./components/productsDetail";
import AllProducts from "./components/AllProductsComponent";
import Register from "./components/Register";
import Login from "./components/Login";
import Error from "./components/Error";
import Collections from "./components/Collections";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="shopcart" element={<ShopCart />} />
        <Route path="products" element={<AllProducts />} />
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
