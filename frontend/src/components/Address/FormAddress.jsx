import React from "react";

const AddressForm = ({
  newAddress,
  setNewAddress,
  handleSaveAddress,
  editingId,
}) => {
  return (
    <form className="mb-4" onSubmit={handleSaveAddress}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nama Alamat
        </label>
        <input
          type="text"
          id="name"
          className="form-control"
          value={newAddress.name}
          onChange={(e) =>
            setNewAddress({ ...newAddress, name: e.target.value })
          }
          placeholder="Enter name (e.g., Rumah Utama || Kantor)"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="provinsi" className="form-label">
          Provinsi
        </label>
        <input
          type="text"
          id="provinsi"
          className="form-control"
          value={newAddress.provinsi}
          onChange={(e) =>
            setNewAddress({ ...newAddress, provinsi: e.target.value })
          }
          placeholder="Enter provinsi (e.g., Jawa Barat)"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="kabupaten" className="form-label">
          Kabupaten
        </label>
        <input
          type="text"
          id="kabupaten"
          className="form-control"
          value={newAddress.kabupaten}
          onChange={(e) =>
            setNewAddress({ ...newAddress, kabupaten: e.target.value })
          }
          placeholder="Enter kabupaten (e.g., Bandung)"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="kecamatan" className="form-label">
          Kecamatan
        </label>
        <input
          type="text"
          id="kecamatan"
          className="form-control"
          value={newAddress.kecamatan}
          onChange={(e) =>
            setNewAddress({ ...newAddress, kecamatan: e.target.value })
          }
          placeholder="Enter kecamatan (e.g., Cileunyi)"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="kelurahan" className="form-label">
          Desa/Kelurahan
        </label>
        <input
          type="text"
          id="kelurahan"
          className="form-control"
          value={newAddress.kelurahan}
          onChange={(e) =>
            setNewAddress({ ...newAddress, kelurahan: e.target.value })
          }
          placeholder="Enter kelurahan (e.g., Sukapura)"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="details" className="form-label">
          Address Details
        </label>
        <textarea
          id="details"
          className="form-control"
          rows="3"
          value={newAddress.detail}
          onChange={(e) =>
            setNewAddress({ ...newAddress, detail: e.target.value })
          }
          placeholder="Enter address details (e.g., 123 Main Street)"
        ></textarea>
      </div>
      <button type="submit" className="btn btn-success">
        {editingId ? "Update Address" : "Save Address"}
      </button>
    </form>
  );
};

export default AddressForm;
