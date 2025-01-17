/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      title: "System Crash",
      priority: "High",
      message: "Server is down",
    },
    {
      id: 2,
      title: "Password Reset",
      priority: "Medium",
      message: "Forgot password",
    },
    { id: 3, title: "UI Bug", priority: "Low", message: "Button misaligned" },
  ]);

  // Function to add a new ticket
  const addTicket = (ticket) => {
    setTickets((prevTickets) => [...prevTickets, ticket]);
  };

  useEffect(() => {
    console.log(tickets);
  }, [tickets]);

  return (
    <div className="bg-black text-white p-4">
      <Dashboard tickets={tickets} addTicket={addTicket} />
    </div>
  );
};

export default App;
