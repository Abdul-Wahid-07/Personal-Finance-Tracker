"use client";
import { Download } from "lucide-react";

const TransactionList = ({
  transactions,
  expandedMonths,
  toggleMonth,
  startEdit,
  setDeleteId,
  setShowConfirm,
  downloadPDF,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 lg:col-span-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <button
          onClick={downloadPDF}
          className="mt-2 sm:mt-0 w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold px-4 py-2 rounded-xl shadow-md hover:from-blue-700 hover:to-blue-600 transition-all duration-300 ease-in-out"
        >
          <Download className="w-5 h-5" />
          <span>Download PDF</span>
        </button>
      </div>

      {transactions.length > 0 ? (
        Object.entries(
          transactions.reduce((acc, t) => {
            if (t.createdAt) {
              const d = new Date(t.createdAt);
              if (!isNaN(d)) {
                const month = d.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                });
                if (!acc[month]) acc[month] = [];
                acc[month].push(t);
              }
            }
            return acc;
          }, {})
        )
          .sort((a, b) => new Date(b[0]) - new Date(a[0]))
          .map(([month, txns], idx) => {
            const isExpanded = expandedMonths[month] || false;
            return (
              <div key={idx} className="mb-6">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  {month}
                </h3>
                <ul className="space-y-3">
                  {(isExpanded ? txns : txns.slice(0, 5)).map((t, i) => (
                    <li
                      key={i}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <div>
                        <span className="font-medium">{t.description}</span>
                        <span
                          className={`ml-3 ${
                            t.type === "income"
                              ? "text-green-600"
                              : "text-red-600"
                          } font-semibold`}
                        >
                          {t.type === "income" ? "+" : "-"}₹{t.amount}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(t)}
                          className="px-3 py-1 text-sm bg-blue-500 text-white rounded-xl hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setDeleteId(t._id);
                            setShowConfirm(true);
                          }}
                          className="px-3 py-1 text-sm bg-red-500 text-white rounded-xl hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                {txns.length > 5 && (
                  <button
                    onClick={() => toggleMonth(month)}
                    className="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer"
                  >
                    {isExpanded ? "Show Less" : "View All"}
                  </button>
                )}
              </div>
            );
          })
      ) : (
        <p className="text-gray-500">No transactions found</p>
      )}
    </div>
  );
};

export default TransactionList;
