/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion } from "framer-motion";

const Dashboard = ({ tickets, addTicket }) => {
  const [formData, setFormData] = useState({
    title: "",
    priority: "Low",
    message: "",
  });
  const [error, setError] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.message) {
      setError("Title and message are required.");
      return;
    }

    const newTicket = {
      id: tickets.length + 1,
      title: formData.title,
      priority: formData.priority,
      message: formData.message,
    };

    addTicket(newTicket);
    setFormData({ title: "", priority: "Low", message: "" });
    setError("");
  };

  // Count tickets by priority
  const countByPriority = (priority) =>
    tickets.filter((ticket) => ticket.priority === priority).length;

  return (
    <div className="p-4">
      <h1 className="text-3xl text-center mb-10">Ticket System</h1>

      {/* Priority Ticket Counts */}
      <div className="flex justify-around mb-8">
        <div className="bg-red-500 text-white p-4 rounded">
          High Priority: {countByPriority("High")}
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded">
          Medium Priority: {countByPriority("Medium")}
        </div>
        <div className="bg-blue-500 text-white p-4 rounded">
          Low Priority: {countByPriority("Low")}
        </div>
      </div>

      {/* Ticket List */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Tickets</h2>
        <ul>
          {tickets.map((ticket) => (
            <li
              key={ticket.id}
              className={`border p-4 rounded mb-2 ${
                ticket.priority === "High"
                  ? "border-red-500"
                  : ticket.priority === "Medium"
                  ? "border-yellow-500"
                  : "border-blue-500"
              }`}
            >
              <div className="flex justify-between"><h3 className="font-bold">{ticket.title}</h3><p>Ticket#<br />{ticket.id}</p></div>
              <p className="text-center">{ticket.message}</p>
              <p className="text-sm text-gray-500">
                Priority: {ticket.priority}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Ticket Form */}
      <motion.div
        initial={{ opacity: 0, x: -300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="border-8 p-4 rounded"
      >
        <h2 className="text-xl font-bold mb-4">Submit a New Ticket</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md text-black"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md text-black"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Dashboard;
