import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsCheckCircle, BsClock } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Mengambil daftar pesanan
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/order", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setOrders(response.data);
        console.log("Orders fetched:", response.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrders();
  }, [token]);

  const handleInvoice = async (order) => {
    if (!order.order || !order.order._id) {
      alert("Invalid order data.");
      return;
    }

    // Jika statusnya `waiting_payment`, proses pembayaran
    if (order.order.status === "waiting_payment") {
      try {
        const totalHarga = order.order.total;

        // Proses pembayaran menggunakan popup
        const input = prompt(
          `Masukkan jumlah pembayaran untuk Order ID: ${
            order.order._id
          }\nTotal Harga: Rp${totalHarga.toLocaleString()}`,
          ""
        );

        if (!input || isNaN(input) || parseFloat(input) !== totalHarga) {
          alert(
            `Jumlah pembayaran tidak valid. Pastikan sesuai dengan total harga: Rp${totalHarga.toLocaleString()}.`
          );
          return;
        }

        const userAmount = parseFloat(input);

        // Kirim data pembayaran ke server
        const paymentPayload = {
          order: order.order._id,
          amount: userAmount,
        };

        await axios.post("http://localhost:5000/api/invoices", paymentPayload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert(
          `Pembayaran berhasil! \nOrder ID: ${
            order._id
          }\nAmount: Rp${userAmount.toLocaleString()}`
        );

        // Arahkan ke halaman detail invoice
        navigate(`/invoice/${order.order._id}`);
      } catch (error) {
        console.error("Payment error:", error);
        alert("Terjadi kesalahan saat memproses pembayaran.");
      }
    } else {
      // Langsung arahkan ke halaman detail invoice jika bukan `waiting_payment`
      navigate(`/invoice/${order.order._id}`);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-start mb-4">Order History</h2>
      {orders.length > 0 ? (
        <div className="flex">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>No Pemesanan</th>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.order._id}</td>
                  <td>{order.product.name}</td>
                  <td>Rp {order.product.price.toLocaleString()}</td>
                  <td>Rp {order.order.total.toLocaleString()}</td>
                  <td>
                    <span
                      className={`fw-bold ${
                        order.order.status === "success"
                          ? "text-success"
                          : "text-warning"
                      }`}
                    >
                      {order.order.status === "success" ? (
                        <BsCheckCircle
                          className="ms-2"
                          style={{ fontSize: "1.5em", fontWeight: "bold" }}
                        />
                      ) : (
                        <BsClock
                          className="ms-2"
                          style={{ fontSize: "1.5em", fontWeight: "bold" }}
                        />
                      )}
                      <span className="ms-2">{order.order.status}</span>
                    </span>
                  </td>
                  <td>
                    {order.order.status === "waiting_payment" ? (
                      <button
                        onClick={() => handleInvoice(order)}
                        className="btn btn-warning btn-sm"
                      >
                        Bayar
                      </button>
                    ) : (
                      <button
                        onClick={() => handleInvoice(order)}
                        className="btn btn-success btn-sm"
                      >
                        Detail
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No orders found.</p>
      )}
    </div>
  );
};

export default OrderHistory;
