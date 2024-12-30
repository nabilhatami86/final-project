const CartSummary = ({
  items,
  calculateSubtotal,
  selectedItems,
  handleProceedToOrder,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="text-center">Ringkasan Belanja</h4>
      </div>
      <div className="card-body">
        <table className="table table-borderless">
          <thead className="text-start">
            <tr>
              <th>Product</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems.map((item, index) => {
              return (
                <tr key={item.product._id || index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        style={{
                          width: "30px",
                          height: "30px",
                          objectFit: "cover",
                          marginRight: "10px",
                        }}
                      />
                      <span>{item.product.name}</span>
                    </div>
                  </td>
                  <td className="text-center">{item.qty || 0}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {items.some((item) => selectedItems.includes(item.product._id)) ? (
          <h5 className="card-title">
            Total: Rp {calculateSubtotal().toLocaleString("id-ID")}
          </h5>
        ) : (
          <p className="text-center">Please select items to proceed.</p>
        )}
        <button
          className="btn btn-success w-100"
          onClick={handleProceedToOrder}
        >
          Beli
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
