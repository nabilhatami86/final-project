import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import NavbarComponent from "../components/Navbar/Navbar";
import FooterComponent from "../pages/Footer/Footer";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Product from "../components/Product/ProductList";
import Cart from "../components/Cart/Cart";
import Address from "../components/Address/Address";
import Order from "../components/Order/Order";
import Invoice from "../components/Order/Invoice";
import Home from "../pages/Home/Home";
import TransactionHistory from "../components/TransactionHistory/invoiceHistory";

const RouterAplication = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };
  return (
    <div>
      <NavbarComponent onSearchChange={handleSearchChange} />

      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product" element={<Product searchTerm={searchTerm} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<Address />} />
        <Route path="/order" element={<Order />} />
        <Route path="/invoice/:order_id" element={<Invoice />} />
        <Route path="/history" element={<TransactionHistory />} />
      </Routes>

      <FooterComponent />
    </div>
  );
};

export default RouterAplication;
