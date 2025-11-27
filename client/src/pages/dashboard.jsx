import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

function Dashboard() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  const fetchFeedback = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api");
      setFeedbackList(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: editingItem || {
      name: "",
      email: "",
      eventName: "",
      division: "",
      rating: "",
      comment: "",
      suggestion: "",
      status: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(1).max(50).required("Name is required"),
      email: Yup.string().email().min(1).max(50).required("Email is required"),
      eventName: Yup.string()
        .min(1)
        .max(50)
        .required("Event name is required"),
      division: Yup.string()
        .oneOf(["LnT", "EEO", "PR", "HRD", "RnD"])
        .required("Division is required"),
      rating: Yup.number().min(1).max(5).required("Rating is required"),
      comment: Yup.string(),
      suggestion: Yup.string(),
      status: Yup.string().oneOf(["open", "in-review", "resolved"]),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await axios.put(`http://localhost:8000/api/${editingItem.id}`, values);
        setStatusMessage({ type: "success", text: "Feedback updated!" });
        setEditingItem(null);
        fetchFeedback();
        setTimeout(() => setStatusMessage(null), 5000);
      } catch (err) {
        setStatusMessage({
          type: "error",
          text: err.response?.data?.message || "Failed to update feedback",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this feedback?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/${id}`);
      setStatusMessage({ type: "success", text: "Feedback deleted!" });
      fetchFeedback();
      setTimeout(() => setStatusMessage(null), 5000);
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to delete feedback",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Feedback Dashboard
        </h1>

        {statusMessage && (
          <div
            className={`mb-6 p-4 rounded-lg shadow-md flex items-start gap-3 ${
              statusMessage.type === "success"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <p
              className={
                statusMessage.type === "success"
                  ? "text-green-800"
                  : "text-red-800"
              }
            >
              {statusMessage.text}
            </p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Division
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Comment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Suggestion
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feedbackList.map((fb) => (
                <tr key={fb.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{fb.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{fb.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {fb.eventName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{fb.division}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{fb.rating}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{fb.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {fb.comment ? fb.comment : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {fb.suggestion ? fb.suggestion : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                      onClick={() => setEditingItem(fb)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                      onClick={() => handleDelete(fb.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {feedbackList.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-500">
                    No feedback available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {editingItem && (
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative">
              <h2 className="text-2xl font-bold mb-4 text-gray-700">
                Update Feedback
              </h2>
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="name"
                    placeholder="Full Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    name="event_name"
                    placeholder="Event Name"
                    value={formik.values.event_name}
                    onChange={formik.handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    name="division"
                    value={formik.values.division}
                    onChange={formik.handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Division</option>
                    {["LnT", "EEO", "PR", "HRD", "RnD"].map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <select
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Status</option>
                    {["open", "in-review", "resolved"].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <input
                    name="rating"
                    type="number"
                    min="1"
                    max="5"
                    placeholder="Rating"
                    value={formik.values.rating}
                    onChange={formik.handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    name="comment"
                    placeholder="Comment"
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                  />
                  <textarea
                    name="suggestion"
                    placeholder="Suggestion"
                    value={formik.values.suggestion}
                    onChange={formik.handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
