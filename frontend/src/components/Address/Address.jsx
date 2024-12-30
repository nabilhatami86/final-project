import axios from "axios";
import React, { useEffect, useState } from "react";
import AddressForm from "./FormAddress";
import AddressList from "./ListAddress";

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [newAddress, setNewAddress] = useState({
    name: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    kelurahan: "",
    detail: "",
  });

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) {
    window.location.href = "/login";
  }

  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axiosInstance.get("/deliveryaddresses");
        setAddresses(response.data);
      } catch (err) {
        setError("Failed to fetch addresses. Please try again.");
        console.error(err);
      }
    };

    fetchAddresses();
  }, []);

  const handleSaveAddress = async (e) => {
    e.preventDefault();

    if (
      !newAddress.name ||
      !newAddress.provinsi ||
      !newAddress.kabupaten ||
      !newAddress.kecamatan ||
      !newAddress.kelurahan ||
      !newAddress.detail
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      const addressWithUserId = {
        ...newAddress,
        user: userId,
      };

      let response;
      if (editingId) {
        response = await axiosInstance.put(
          `/deliveryaddresses/${editingId}`,
          addressWithUserId
        );
        setAddresses(
          addresses.map((address) =>
            address._id === editingId ? response.data : address
          )
        );
        setEditingId(null);
      } else {
        response = await axiosInstance.post(
          "/deliveryaddresses",
          addressWithUserId
        );
        setAddresses([...addresses, response.data]);
      }

      setNewAddress({
        name: "",
        provinsi: "",
        kabupaten: "",
        kecamatan: "",
        kelurahan: "",
        detail: "",
      });
    } catch (err) {
      setError("Failed to save address. Please try again.");
      console.error(err);
    }
  };

  const handleEditAddress = (address) => {
    setNewAddress({
      name: address.name,
      provinsi: address.provinsi,
      kabupaten: address.kabupaten,
      kecamatan: address.kecamatan,
      kelurahan: address.kelurahan,
      detail: address.detail,
    });
    setEditingId(address._id);
  };

  const handleDeleteAddress = async (id) => {
    try {
      await axiosInstance.delete(`/deliveryaddresses/${id}`);
      setAddresses(addresses.filter((address) => address._id !== id));
    } catch (err) {
      setError("Failed to delete address. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="container py-4">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {/* Form Tambah Alamat */}
        <div className="col-md-6 mb-4">
          <h3 className="mb-3">Tambah Alamat</h3>
          <AddressForm
            newAddress={newAddress}
            setNewAddress={setNewAddress}
            handleSaveAddress={handleSaveAddress}
            editingId={editingId}
          />
        </div>
        {/* Daftar Alamat */}
        <div className="col-md-6">
          <h3 className="mb-3">Alamat Saya</h3>
          <AddressList
            addresses={addresses}
            handleEditAddress={handleEditAddress}
            handleDeleteAddress={handleDeleteAddress}
          />
        </div>
      </div>
    </div>
  );
};

export default Address;
