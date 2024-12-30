import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartItems,
  deleteCart,
  selectProduct,
  deselectProduct,
  clearBuyNow,
} from "../../redux/cartSlice";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import "./css/cart.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const { items, product } = useSelector((state) => state.cart);
  console.log("Selected products", product);

  useEffect(() => {
    if (token) {
      dispatch(getCartItems());
    } else {
      console.error("Token tidak tersedia");
    }
  }, [token]);

  const handleDelete = (id) => {
    dispatch(deleteCart(id)).then(() => {
      dispatch(getCartItems());
    });
  };

  const handleIncrement = async (product_id) => {
    try {
      await axios.put(
        "http://localhost:5000/api/carts",
        {
          product_id: product_id,
          plus: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getCartItems());
    } catch (error) {
      console.error("Terjadi kesalahan saat menambah jumlah:", error);
    }
  };

  const handleDecrement = async (product_id) => {
    try {
      await axios.put(
        "http://localhost:5000/api/carts",
        {
          product_id: product_id,
          min: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getCartItems());
    } catch (error) {
      console.error("Terjadi kesalahan saat mengurangi jumlah:", error);
    }
  };

  const handleSelectItem = (item) => {
    const isSelected = product.some(
      (selectedItem) => selectedItem._id === item._id
    );

    if (isSelected) {
      dispatch(deselectProduct(item._id));
    } else {
      dispatch(
        selectProduct({
          product: item.product,
          qty: item.qty,
          _id: item._id,
        })
      );
    }
  };

  const isCheckoutEnabled = product.length > 0;

  const calculateSubtotal = () => {
    return items.reduce((total, item) => {
      if (product.some((selectedItem) => selectedItem._id === item._id)) {
        total += item.product.price * item.qty;
      }
      return total;
    }, 0);
  };

  const handleProceedToOrder = () => {
    dispatch(clearBuyNow());
    navigate("/order");
  };

  if (!items || items.length === 0) {
    return (
      <div className="empty-cart-container text-center">
        <FaShoppingCart size={100} color="#28a745" />
        <h2 className="mt-3">Keranjang Anda Kosong</h2>
        <p className="text-muted">
          Sepertinya keranjang Anda kosong. Ayo mulai belanja!
        </p>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/product")}
        >
          Lihat Produk
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <h1 className="fs-4 mt-3 mb-4">Keranjang</h1>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Check</th>
                <th>Produk</th>
                <th>Harga</th>
                <th>Kuantitas</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <CartItem
                  key={item.product._id}
                  item={item}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  onDelete={handleDelete}
                  onSelect={() => handleSelectItem(item)}
                  isSelected={product.some(
                    (selectedItem) => selectedItem._id === item._id
                  )}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-md-4 mt-4">
          <CartSummary
            items={product}
            calculateSubtotal={calculateSubtotal}
            handleProceedToOrder={handleProceedToOrder}
            isCheckoutEnabled={isCheckoutEnabled}
            selectedItems={product}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
