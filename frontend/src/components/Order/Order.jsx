import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import "./css/Order.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Order = () => {
  const [dataCourier, setDataCourier] = useState([]);
  const [dataAddress, setDataAddress] = useState([]);
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const { product, buyProduct } = useSelector((state) => state.cart);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/courier")
      .then((response) => {
        setDataCourier(response.data);
      })
      .catch((error) => {
        console.error("Courier data error:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/deliveryaddresses", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setDataAddress(response.data);
      })
      .catch((error) => {
        console.error("Address data error:", error);
      });
  }, [token]);

  const handleSubmit = async () => {
    try {
      let data = [];

      // Menyiapkan data produk yang akan dibeli
      if (product.length > 0) {
        product.forEach((item) => {
          data.push({
            product: item.product._id,
            qty: item.qty,
            cart: item._id,
          });
        });
      } else if (buyProduct) {
        data.push({
          product: buyProduct._id,
          qty: 1,
          cart: null,
        });
      }

      // Payload untuk membuat pesanan
      const payload = {
        items: data,
        delivery_fee: selectedCourier.delivery_fee,
        delivery_address: selectedAddress._id,
      };

      const response = await axios.post(
        "http://localhost:5000/api/order",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const order = response.data.order;
      console.log("Order Response:", order);

      if (!order || !order.id) {
        throw new Error("Order ID tidak ditemukan dalam respons API.");
      }

      // Hitung total harga
      const totalHarga = calculateTotalBelanja();

      let userAmount;
      let isPaymentCanceled = false;

      // Proses pembayaran
      while (true) {
        // Minta pengguna memasukkan jumlah pembayaran atau membatalkan
        const input = prompt(
          `Masukkan jumlah pembayaran untuk Order ID: ${
            order.id
          } \nTotal Harga: Rp${totalHarga.toLocaleString()} \nAtau ketik 'batal' untuk membatalkan pembayaran.`,
          ""
        );

        // Jika pengguna memilih untuk membatalkan
        if (input.toLowerCase() === "batal") {
          isPaymentCanceled = true;
          break;
        }

        // Validasi input sebagai angka dan pastikan sesuai total harga
        if (input && !isNaN(input) && parseFloat(input) === totalHarga) {
          userAmount = parseFloat(input);
          break;
        }

        alert(
          `Jumlah pembayaran tidak valid. Pastikan sesuai dengan total harga: Rp${totalHarga.toLocaleString()}.`
        );
      }

      // Jika pembayaran dibatalkan, tidak perlu lanjut ke invoice
      if (isPaymentCanceled) {
        alert(`Pembayaran untuk Order ID: ${order.id} dibatalkan.`);
        setModalMessage("Pembayaran dibatalkan, pesanan tidak diproses.");
        setShowModal(true);
        window.location.href = `/invoice/${order.id}`;
        return; // Menghentikan eksekusi lebih lanjut
      }

      // Kirim data pembayaran ke server
      const paymentPayload = {
        order: order.id,
        amount: userAmount,
      };

      const paymentResponse = await axios.post(
        "http://localhost:5000/api/invoices",
        paymentPayload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Payment Response:", paymentResponse.data);

      alert(
        `Pembayaran berhasil! \nOrder ID: ${
          order.id
        } \nAmount: Rp${userAmount.toLocaleString()}`
      );

      setModalMessage("Pesanan dan pembayaran berhasil diproses.");
      setShowModal(true);
      window.location.href = `/invoice/${order.id}`;
    } catch (error) {
      console.error("Error:", error);
      setModalMessage(
        "Terjadi kesalahan saat memproses pesanan atau pembayaran."
      );
      setShowModal(true);
    }
  };

  const calculateTotalHarga = () => {
    if (product.length > 0) {
      return product.reduce(
        (total, item) => total + item.product.price * item.qty,
        0
      );
    } else if (buyProduct) {
      return buyProduct.price * 1;
    } else {
      return 0;
    }
  };

  const calculateOngkir = () => {
    return selectedCourier ? selectedCourier.delivery_fee : 0;
  };

  const calculateTotalBelanja = () => {
    return calculateTotalHarga() + calculateOngkir();
  };

  const handleAddressSelect = (addressId) => {
    const selected = dataAddress.find((address) => address._id === addressId);
    setSelectedAddress(selected);
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">PENGIRIMAN</h3>

      <div className="row">
        {/* Alamat Pengiriman */}
        <div className="col-md-8">
          <div className="card mb-3">
            <div className="card-header bg-primary">
              <h5 className="mb-0 text-dark">Alamat Pengiriman</h5>
            </div>
            <div className="card-body">
              <Dropdown>
                <Dropdown.Toggle variant="info" id="dropdown-basic">
                  {selectedAddress ? selectedAddress.name : "Pilih Alamat"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {dataAddress.length > 0 ? (
                    dataAddress.map((address) => (
                      <Dropdown.Item
                        key={address._id}
                        onClick={() => handleAddressSelect(address._id)}
                      >
                        {address.name}, {address.provinsi}, {address.kabupaten},
                        {address.kecamatan}, {address.kelurahan},{" "}
                        {address.detail}
                      </Dropdown.Item>
                    ))
                  ) : (
                    <Dropdown.Item disabled>Loading...</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
              {selectedAddress && (
                <div className="mt-3 p-4 border rounded-3 bg-light shadow-sm">
                  <p className="fw-bold fs-5">{selectedAddress.name}</p>
                  <p className="mb-1">
                    {selectedAddress.provinsi}, {selectedAddress.kabupaten},
                    {selectedAddress.kecamatan}, {selectedAddress.kelurahan}
                  </p>
                  <p className="text-muted">{selectedAddress.detail}</p>
                </div>
              )}
            </div>
          </div>

          {/* Product List */}
          <div className="card mb-3">
            <div className="card-body">
              <div className="d-flex flex-wrap">
                {product.length > 0 ? (
                  product.map((productItem) => (
                    <div
                      key={productItem._id}
                      className="d-flex align-items-center mb-3 w-100"
                    >
                      <img
                        src={
                          productItem.product.image_url || "/placeholder.png"
                        }
                        alt={productItem.product.name || "Produk"}
                        className="img-thumbnail rounded"
                        style={{ width: "100px", height: "100px" }}
                      />
                      <div className="ms-3">
                        <h6 className="mb-1">{productItem.product.name}</h6>
                        <p>Qty: {productItem.qty || 1}</p>
                      </div>
                      <div className="ms-auto text-end">
                        <p>Rp{productItem.product.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="d-flex align-items-center mb-3 w-100">
                    {/* Menampilkan informasi product buyProduct */}
                    <img
                      src={buyProduct?.image_url || "/placeholder.png"}
                      alt={buyProduct?.name || "Produk"}
                      className="img-thumbnail rounded"
                      style={{ width: "100px", height: "100px" }}
                    />
                    <div className="ms-3">
                      <h6 className="mb-1">{buyProduct?.name || "Produk"}</h6>
                      <p>Qty: {buyProduct?.qty || 1}</p>
                    </div>
                    <div className="ms-auto text-end">
                      <p>Rp{buyProduct?.price?.toLocaleString() || "0"}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Courier Dropdown */}
              <Dropdown className="d-flex justify-content-end mt-3">
                <Dropdown.Toggle variant="info" id="dropdown-kurir">
                  {selectedCourier
                    ? `${selectedCourier.name} - Rp${selectedCourier.delivery_fee}`
                    : "Pilih Kurir"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {dataCourier.map((courier) => (
                    <Dropdown.Item
                      key={courier.id}
                      onClick={() => setSelectedCourier(courier)}
                    >
                      {courier.name} - Rp{courier.delivery_fee}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-dark">
              <h5 className="mb-0">Ringkasan Belanja</h5>
            </div>
            <div className="card-body">
              <p className="d-flex justify-content-between">
                <span>
                  Total Harga (
                  {product.length > 0 ? product.length : buyProduct ? 1 : 0}{" "}
                  Barang)
                </span>
                <span>Rp{calculateTotalHarga().toLocaleString()}</span>
              </p>
              <p className="d-flex justify-content-between">
                <span>Ongkir</span>
                <span>Rp{calculateOngkir().toLocaleString()}</span>
              </p>
              <p className="d-flex justify-content-between">
                <span>Total Belanja</span>
                <span>Rp{calculateTotalBelanja().toLocaleString()}</span>
              </p>
              <button className="btn btn-success w-100" onClick={handleSubmit}>
                Beli
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{modalMessage}</h3>
            <button className="btn-close" onClick={() => setShowModal(false)}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
