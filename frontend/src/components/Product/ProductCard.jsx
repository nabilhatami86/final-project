import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { buyNow, clearSelectedProducts } from "../../redux/cartSlice";
const token = localStorage.getItem("token");

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [showFullDescription, setShowFullDescription] = useState(false);

  const handleAddToCart = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/carts",
        {
          product_id: product._id,
          plus: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Error add product:", err);
    }
  };

  const handleBuyNow = (product) => {
    dispatch(buyNow(product));
    dispatch(clearSelectedProducts());
    navigate("/order");
  };

  // const description =
  //   product.description?.length > 100 && !showFullDescription
  //     ? product.description.slice(0, 100) + "..."
  //     : product.description;

  return (
    <div className="card custom-card shadow">
      <img
        src={product.image_url}
        className="card-img-top custom-img"
        alt={product.name || "Produk"}
      />
      <div className="card-body">
        <h5 className="card-title">{product.name || "Produk"}</h5>
        <p className="card-text fw-semibold">
          Rp.{product.price?.toLocaleString("id-ID") || "0"}
        </p>
        {/* <p className="card-text">
          {description}
          {product.description?.length > 100 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="btn btn-link p-0"
            >
              {showFullDescription ? "Tutup" : "Baca Selengkapnya"}
            </button>
          )}
        </p> */}
        <button
          onClick={() => handleBuyNow(product)}
          type="button"
          className="btn btn-success w-100 mb-2 rounded-2"
        >
          Beli
        </button>
        <button
          onClick={() => handleAddToCart(product._id)}
          type="button"
          className="btn btn-warning w-100 mb-2 rounded-2"
        >
          Keranjang
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
