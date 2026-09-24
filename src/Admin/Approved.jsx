
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../Config/Base-url";
import toast from "react-hot-toast";


function Approved() {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
const [selectedOrder, setSelectedOrder] = useState(null);
const [assignRemark, setAssignRemark] = useState("");
  

  useEffect(() => {
    getorderData();
  }, []);

  const getorderData = async () => {
    setLoading(true);
    setError(null);

    try {
  const response = await axios.get(
  `${BASE_URL}admin/getdatawhere/tbl_orders/order_stage/8`
);

console.log("API RESPONSE:", response.data);

      if (response.data.status) {
        setQuotations(response.data.data);
      } else {
        setQuotations([]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data.");
      toast.error("Failed to load data!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-fluid px-3 px-lg-4 py-4">
        <div className="page-heading">
          <div className="page-heading-copy">
            <span className="page-icon">
              <i className="bi bi-file-text" aria-hidden="true"></i>
            </span>
            <div>
              <p className="eyebrow mb-1">All</p>
              <h1 className="h3 mb-1">Approved</h1>
            </div>
          </div>
        </div>

        <section className="panel">

          <div className="table-responsive">
            <table
              className="table align-middle mb-0"
              id="ordersTable"
              data-searchable-table
            >
              <thead>
                <tr className="text-center">
                  <th>Action</th>
                  <th>Order Code</th>
                  <th>Quotation</th>
                  <th>Remark</th>
                  <th>Request Date & Time</th>
                </tr>
              </thead>
              <tbody className="activity-date-time">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="6" className="text-center text-danger py-4">
                      {error}
                    </td>
                  </tr>
                ) : quotations.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No quotations found for Stage 6.
                    </td>
                  </tr>
                ) : (
                  quotations.map((item, index) => (
                    <tr key={item.order_id || index} className="text-center">
                      <td>            
     <button
  type="button"
  className="btn border-danger text-danger"
  onClick={() => {
    setSelectedOrder(item);
    setAssignRemark("");
    setShowAssignModal(true);
  }}
>
  Assign Supplier
</button>
</td>
                      <td className="fw-bold">{item.order_code || "N/A"}</td>

                      <td>
                        <a
                          href={`${BASE_URL}public/Uploads/${item.order_quotation}`}
                          className="text-danger fw-bold text-decoration-none"
                          style={{ cursor: "pointer", fontSize: "16px" }}
                          target="_blank"
                        >
                          View Quotations
                        </a>
                      </td>
                      <td>{item.order_remark || "N/A"}</td>

                      <td>
                        {item.order_request_date} {item.order_request_time}
                      </td>
                     
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          
        </section>
        {showAssignModal && (
  <div
    className="modal fade show d-block"
    tabIndex="-1"
    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">

        <div className="modal-header">
          <h5 className="modal-title">Assign Supplier</h5>

          <button
            type="button"
            className="btn-close"
            onClick={() => setShowAssignModal(false)}
          ></button>
        </div>

        <div className="modal-body">

          {/* Supplier Name */}
          <div className="mb-3">
            
            <label className="form-label fw-semibold">
              Supplier Name
            </label>

          <input
  type="text"
  className="form-control"
  value={selectedOrder?.supplier_name || ""}
  readOnly
/>
          </div>

          {/* Remark */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Remark
            </label>

            <textarea
              className="form-control"
              rows="4"
              placeholder="Enter remark"
              value={assignRemark}
              onChange={(e) => setAssignRemark(e.target.value)}
            ></textarea>
          </div>

        </div>

        <div className="modal-footer">

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowAssignModal(false)}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn btn-danger"
          >
            Assign Supplier
          </button>

        </div>

      </div>
    </div>
  </div>
)}
      </div>
      
    </>
  );
  
}


export default Approved;
