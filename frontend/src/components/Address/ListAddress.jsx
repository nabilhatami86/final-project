import React from "react";

const AddressList = ({ addresses, handleEditAddress, handleDeleteAddress }) => {
  return (
    <ul className="list-group">
      {addresses.length > 0 ? (
        addresses.map((address) => (
          <li
            key={address._id}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div className="me-3">
              <h5 className="mb-1" style={{ fontSize: "1.5rem" }}>
                {address.name}
              </h5>
              <p className="mb-1 text-muted">
                {address.provinsi}, {address.kabupaten}
              </p>
              <p className="mb-1 text-muted">
                {address.kecamatan}, {address.kelurahan}
              </p>
              <p className="mb-1 text-muted">{address.detail}</p>
            </div>
            <div class="d-flex justify-content-start flex-wrap gap-2">
              <button
                type="button"
                class="btn btn-warning btn-sm"
                onClick={() => handleEditAddress(address)}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-danger btn-sm"
                onClick={() => handleDeleteAddress(address._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))
      ) : (
        <p className="text-muted">No addresses available</p>
      )}
    </ul>
  );
};

export default AddressList;
