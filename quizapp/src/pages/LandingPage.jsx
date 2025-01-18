import React, { useState } from "react";
import { fetchData } from "../api/questions";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate= useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission.

    // Basic validation
    if (!name || !email) {
      alert("Please fill in both Name and Email fields.");
      return;
    }

    try {
      const data = await fetchData(); // Fetch data from API.
      console.log("Fetched Data:", data);
      alert("Data fetched successfully! Check console for details.");
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      navigate("/quiz")

    } catch (error) {
      console.error("Error in handleSubmit:", error);
      alert("Failed to fetch data. Please try again.");
    }
  };

  return (
    <div className="w-screen text-blue-950/90 h-screen bg-blue-100 p-12">
      <h1 className="text-5xl font-bold text-center">Welcome to my Quiz App</h1>
      <p className="text-lg text-left mt-24">Please enter your details</p>
      <div className="bg-white sm:w-[440px] p-3 rounded-[20px] mt-6 shadow-sm shadow-white w-auto h-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-2">
            <label htmlFor="name" className="text-lg">Name:</label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border bg-white border-gray-400 rounded-xl"
              value={name}
              onChange={(e) => setName(e.target.value)} // Update name state.
            />

            <label htmlFor="email" className="text-lg">Email:</label>
            <input
              id="email"
              type="email"
              className="w-full p-2 border bg-white border-gray-400 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state.
            />

            <button
              type="submit"
              className="bg-[#4f46e5] text-white p-2 rounded-[40px]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
