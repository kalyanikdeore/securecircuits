import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../Config/Base-url";
import toast from "react-hot-toast";

function Approved() {
  const [quotations, setQuotations] = useState([]);
  const [supplierData, setSupplierData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [assignRemark, setAssignRemark] = useState("");

  // =====================================================
  // LOAD ORDERS + SUPPLIERS
  // =====================================================
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [orderResponse, supplierResponse] = await Promise.all([
        axios.get(
          `${BASE_URL}admin/getdatawhere/tbl_orders/order_stage/8`
        ),

        axios.get(
          `${BASE_URL}admin/getdata/tbl_suppliers`
        ),
      ]);

      console.log("========== ORDERS API ==========");
      console.log(orderResponse.data);

      console.log("========== SUPPLIER API ==========");
      console.log(supplierResponse.data);

      // -------------------------------------------------
      // ORDERS
      // -------------------------------------------------
      if (orderResponse.data?.status) {
        setQuotations(orderResponse.data.data || []);
      } else {
        setQuotations([]);
      }

      // -------------------------------------------------
      // SUPPLIERS
      // -------------------------------------------------
      if (supplierResponse.data?.status) {
        setSupplierData(supplierResponse.data.data || []);
      } else {
        setSupplierData([]);
      }

    } catch (err) {
      console.error("LOAD DATA ERROR:", err);

      setError("Failed to fetch data.");
      toast.error("Failed to load data!");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // GET SUPPLIER NAME USING SUPPLIER ID
  // =====================================================
  const getSupplierName = (supplierId) => {

    if (
      supplierId === null ||
      supplierId === undefined ||
      supplierId === ""
    ) {
      return "Not Assigned";
    }

    const supplier = supplierData.find(
      (item) =>
        String(item.supp_id) === String(supplierId)
    );

    console.log("GET SUPPLIER NAME");
    console.log("Supplier ID:", supplierId);
    console.log("Matched Supplier:", supplier);

    if (!supplier) {
      return "Not Assigned";
    }

    // Contact person
    const contactPerson =
      supplier.supp_contact_person || "";

    // Company name
    const companyName =
      supplier.supp_company_name || "";

    if (contactPerson && companyName) {
      return `${contactPerson} - ${companyName}`;
    }

    if (contactPerson) {
      return contactPerson;
    }

    if (companyName) {
      return companyName;
    }

    return "Not Assigned";
  };

  // =====================================================
  // OPEN ASSIGN SUPPLIER MODAL
  // =====================================================
  const handleAssignSupplier = (item) => {

    const supplierName = getSupplierName(
      item.quote_supplier
    );

    console.log("=================================");
    console.log("SELECTED ORDER:", item);
    console.log("SUPPLIER ID:", item.quote_supplier);
    console.log("SUPPLIER NAME:", supplierName);
    console.log("=================================");

    setSelectedOrder({
      ...item,
      quote_supplier_name: supplierName,
    });

    setAssignRemark("");
    setShowAssignModal(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================
  const closeAssignModal = () => {
    setShowAssignModal(false);
    setSelectedOrder(null);
    setAssignRemark("");
  };

  // =====================================================
  // ASSIGN SUPPLIER
  // =====================================================
  const handleAssignSupplierSubmit = async () => {

    if (!selectedOrder) {
      toast.error("Order not selected");
      return;
    }

    try {

      console.log("ASSIGN SUPPLIER DATA:", {
        order_id: selectedOrder.order_id,
        quote_supplier: selectedOrder.quote_supplier,
        supplier_name: selectedOrder.quote_supplier_name,
        remark: assignRemark,
      });

      /*
      // जेव्हा actual API तयार असेल तेव्हा uncomment करा

      const response = await axios.post(
        `${BASE_URL}admin/assignSupplier`,
        {
          order_id: selectedOrder.order_id,
          quote_supplier: selectedOrder.quote_supplier,
          remark: assignRemark,
        }
      );

      if (!response.data.status) {
        toast.error(response.data.message || "Assignment failed");
        return;
      }
      */

      toast.success("Supplier assigned successfully!");

      closeAssignModal();

      loadData();

    } catch (error) {

      console.error(
        "ASSIGN SUPPLIER ERROR:",
        error
      );

      toast.error(
        "Failed to assign supplier!"
      );
    }
  };

  return (
    <>
      <div className="container-fluid px-3 px-lg-4 py-4">

        {/* =====================================================
            PAGE HEADING
        ====================================================== */}

        <div className="page-heading">

          <div className="page-heading-copy">

            <span className="page-icon">
              <i
                className="bi bi-file-text"
                aria-hidden="true"
              ></i>
            </span>

            <div>

              <p className="eyebrow mb-1">
                All
              </p>

              <h1 className="h3 mb-1">
                Approved
              </h1>

            </div>

          </div>

        </div>


        {/* =====================================================
            TABLE
        ====================================================== */}

        <section className="panel">

          <div className="table-responsive">

            <table
              className="table align-middle mb-0"
              id="ordersTable"
            >

              <thead>

                <tr className="text-center">

                  <th>
                    Action
                  </th>

                  <th>
                    Order Code
                  </th>

                  <th>
                    Quotation
                  </th>

                  <th>
                    Remark
                  </th>

                  <th>
                    Request Date & Time
                  </th>

                </tr>

              </thead>


              <tbody className="activity-date-time">

                {/* LOADING */}

                {loading && (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center py-4"
                    >
                      Loading...
                    </td>

                  </tr>

                )}


                {/* ERROR */}

                {!loading && error && (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center text-danger py-4"
                    >
                      {error}
                    </td>

                  </tr>

                )}


                {/* NO DATA */}

                {!loading &&
                  !error &&
                  quotations.length === 0 && (

                    <tr>

                      <td
                        colSpan="5"
                        className="text-center py-4"
                      >
                        No quotations found for Stage 8.
                      </td>

                    </tr>

                  )}


                {/* ORDERS */}

                {!loading &&
                  !error &&
                  quotations.length > 0 &&
                  quotations.map((item, index) => (

                    <tr
                      key={
                        item.order_id || index
                      }
                      className="text-center"
                    >

                      {/* ACTION */}

                      <td>

                        <button
                          type="button"
                          className="btn border-danger text-danger"
                          onClick={() =>
                            handleAssignSupplier(item)
                          }
                        >
                          Assign Supplier
                        </button>

                      </td>


                      {/* ORDER CODE */}

                      <td className="fw-bold">

                        {item.order_code || "N/A"}

                      </td>


                      {/* QUOTATION */}

                      <td>

                        {item.order_quotation ? (

                          <a
                            href={`${BASE_URL}public/Uploads/${item.order_quotation}`}
                            className="text-danger fw-bold text-decoration-none"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Quotations
                          </a>

                        ) : (

                          <span>
                            No Quotation
                          </span>

                        )}

                      </td>


                      {/* REMARK */}

                      <td>

                        {item.order_remark || "N/A"}

                      </td>


                      {/* DATE */}

                      <td>

                        {item.order_request_date || "N/A"}

                        {" "}

                        {item.order_request_time || ""}

                      </td>

                    </tr>

                  ))}

              </tbody>

            </table>

          </div>

        </section>


        {/* =====================================================
            ASSIGN SUPPLIER MODAL
        ====================================================== */}

        {/* {showAssignModal && (

          <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{
              backgroundColor:
                "rgba(0,0,0,0.5)",
            }}
          >

            <div className="modal-dialog modal-dialog-centered">

              <div className="modal-content">



                <div className="modal-header">

                  <h5 className="modal-title">
                    Assign Supplier
                  </h5>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeAssignModal}
                  ></button>

                </div>



                <div className="modal-body">



                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Supplier Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={
                        selectedOrder?.quote_supplier_name ||
                        "Not Assigned"
                      }
                      readOnly
                    />

                  </div>


               

                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Remark
                    </label>

                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Enter remark"
                      value={assignRemark}
                      onChange={(e) =>
                        setAssignRemark(
                          e.target.value
                        )
                      }
                    ></textarea>

                  </div>

                </div>



                <div className="modal-footer">

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeAssignModal}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={
                      handleAssignSupplierSubmit
                    }
                  >
                    Assign Supplier
                  </button>

                </div>

              </div>

            </div>

          </div>

        )} */}

        {showAssignModal && (
  <div
    className="modal fade show d-block"
    tabIndex="-1"
    style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
  >
    <div className="modal-dialog modal-dialog-centered modal-md">
      <div className="modal-content border-0 rounded-3 shadow-lg overflow-hidden">

        {/* HEADER */}
        <div
          className="modal-header text-white border-0 px-4 py-3"
          style={{
            background: "linear-gradient(135deg, #e11d2e, #a80f19)",
          }}
        >
          <h5 className="modal-title fw-bold mb-0">
            Assign Supplier
          </h5>

          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={closeAssignModal}
          ></button>
        </div>

        {/* BODY */}
        <div className="modal-body p-4">

          {/* SUPPLIER NAME */}
          <div className="mb-4">
            <label className="form-label fw-semibold text-dark">
              Supplier Name
            </label>

            <input
              type="text"
              className="form-control form-control-lg rounded-3"
              // value={
              //   selectedOrder?.quote_supplier_name ||
              //   "Not Assigned"
              // }
               value={
    selectedOrder?.quote_supplier_name
      ? selectedOrder.quote_supplier_name
          .toLowerCase()
          .replace(/\b\w/g, (char) => char.toUpperCase())
      : "Not Assigned"
  }
              readOnly
            />
          </div>

          {/* REMARK */}
          <div className="mb-2">
            <label className="form-label fw-semibold text-dark">
              Remark
            </label>

            <textarea
              className="form-control rounded-3"
              rows="4"
              placeholder="Enter remark"
              value={assignRemark}
              onChange={(e) =>
                setAssignRemark(e.target.value)
              }
            ></textarea>
          </div>

        </div>

        {/* FOOTER */}
        <div className="modal-footer border-top px-4 py-3 gap-2">

          <button
            type="button"
            className="btn btn-secondary px-4 py-2 rounded-3"
            onClick={closeAssignModal}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn btn-danger px-4 py-2 rounded-3 fw-semibold"
            onClick={handleAssignSupplierSubmit}
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