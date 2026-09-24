import React from "react";

function Approved() {
  const approvedOrders = [
    {
      id: "ORD-001",
      customer: "ABC Technologies",
      design: "PCB_Design_01",
      approvedDate: "24 Sep 2026",
      supplier: "XYZ Electronics",
      status: "Approved",
    },
    {
      id: "ORD-002",
      customer: "Tech Solutions",
      design: "PCB_Design_02",
      approvedDate: "23 Sep 2026",
      supplier: "PCB Supplier",
      status: "Approved",
    },
    {
      id: "ORD-003",
      customer: "Smart Systems",
      design: "PCB_Design_03",
      approvedDate: "22 Sep 2026",
      supplier: "N/A",
      status: "Approved",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Approved Designs
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Customer approved designs forwarded to supplier
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Approved</p>
          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            12
          </h2>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-sm text-gray-500">Sent to Supplier</p>
          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            9
          </h2>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-sm text-gray-500">Pending Supplier</p>
          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            3
          </h2>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Customer Approved Designs
          </h2>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                  Order ID
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                  Customer Name
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                  Design
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                  Approved Date
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                  Supplier
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {approvedOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition"
                >
                  {/* Order ID */}
                  <td className="px-5 py-4 text-sm font-medium text-gray-800">
                    {order.id}
                  </td>

                  {/* Customer */}
                  <td className="px-5 py-4 text-sm text-gray-700">
                    {order.customer}
                  </td>

                  {/* Design */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                        <span className="text-orange-600 font-bold">
                          PCB
                        </span>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {order.design}
                        </p>

                        <p className="text-xs text-gray-400">
                          Gerber Design
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {order.approvedDate}
                  </td>

                  {/* Supplier */}
                  <td className="px-5 py-4 text-sm">
                    {order.supplier === "N/A" ? (
                      <span className="text-gray-400">
                        Not Assigned
                      </span>
                    ) : (
                      <span className="font-medium text-gray-700">
                        {order.supplier}
                      </span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      {order.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-5 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        className="px-3 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                        onClick={() =>
                          alert(`Viewing ${order.design}`)
                        }
                      >
                        View
                      </button>

                      <button
                        className="px-3 py-2 text-sm font-medium rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
                        onClick={() =>
                          alert(`Sending ${order.design} to supplier`)
                        }
                      >
                        Send to Supplier
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Empty State */}
              {approvedOrders.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-12 text-center"
                  >
                    <div className="text-gray-400">
                      <p className="text-lg font-medium">
                        No Approved Designs
                      </p>

                      <p className="text-sm mt-1">
                        Customer approved designs will appear here.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Approved;