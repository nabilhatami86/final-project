import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./css/Product.css";

const ProductList = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTags, setSelectedTags] = useState("all");
  // const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        const allProducts = response.data.data || [];
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      })
      .catch((err) => console.error("Produk tidak dapat ditampilkan:", err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tag")
      .then((response) => {
        setTags(response.data);
      })
      .catch((err) => console.error("Tag tidak dapat ditampilkan:", err));
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else if (selectedCategory === "all" && selectedTags === "all") {
      setFilteredProducts(products);
    }
  }, [searchTerm, products, selectedCategory, selectedTags]);

  const filterCategory = (categoryId) => {
    console.log("Filter Category ID:", categoryId);
    setSelectedCategory(categoryId);

    if (categoryId === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category._id === categoryId
      );
      console.log("Filtered Products:", filtered);
      setFilteredProducts(filtered);
    }
  };

  const filterTags = (tagsId) => {
    setSelectedTags(tagsId);

    if (tagsId === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.tags.some((tag) => tag._id === tagsId)
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="container flex mt-4 ">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="categoryDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FaFilter /> Kategori
          </button>
          <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
            <li>
              <button
                className={`dropdown-item ${
                  selectedCategory === "6742aa4ac8a2387d5cf3dc03"
                    ? "active"
                    : ""
                }`}
                onClick={() => filterCategory("6742aa4ac8a2387d5cf3dc03")}
              >
                Fashion Pria
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item ${
                  selectedCategory === "6742aa78c8a2387d5cf3dc05"
                    ? "active"
                    : ""
                }`}
                onClick={() => filterCategory("6742aa78c8a2387d5cf3dc05")}
              >
                Fashion Wanita
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item ${
                  selectedCategory === "67454610cbb45e2eb932666b"
                    ? "active"
                    : ""
                }`}
                onClick={() => filterCategory("67454610cbb45e2eb932666b")}
              >
                Unisex
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item ${
                  selectedCategory === "all" ? "active" : ""
                }`}
                onClick={() => filterCategory("all")}
              >
                Semua Produk
              </button>
            </li>
          </ul>
        </div>

        {/* Tags Dropdown */}
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="tagsDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FaFilter /> Tags
          </button>
          <ul className="dropdown-menu" aria-labelledby="tagsDropdown">
            <li>
              <button
                className={`dropdown-item ${
                  selectedTags === "67433702a2cab7c2042d51b5" ? "active" : ""
                }`}
                onClick={() => filterTags("67433702a2cab7c2042d51b5")}
              >
                Sepatu
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item ${
                  selectedTags === "67433724a2cab7c2042d51b9" ? "active" : ""
                }`}
                onClick={() => filterTags("67433724a2cab7c2042d51b9")}
              >
                Jaket
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item ${
                  selectedTags === "6743370ea2cab7c2042d51b7" ? "active" : ""
                }`}
                onClick={() => filterTags("6743370ea2cab7c2042d51b7")}
              >
                Celana
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item ${
                  selectedTags === "6743373da2cab7c2042d51bd" ? "active" : ""
                }`}
                onClick={() => filterTags("6743373da2cab7c2042d51bd")}
              >
                Kaos
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Produk */}
      <div className="row g-3 justify-content-start">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            return (
              <div className="col-md-3 col-sm-6" key={product._id}>
                <ProductCard product={product} />
              </div>
            );
          })
        ) : (
          <p className="text-muted">Produk tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
