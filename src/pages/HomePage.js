import React, { useState, useEffect } from "react";
import axios from "axios";

function HomePage() {
  const [referrals, setReferrals] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "",
    resume: null,
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/referrals").then((response) => {
      setReferrals(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("experience", formData.experience);
    data.append("resume", formData.resume);

    axios.post("http://localhost:5000/api/referrals", data).then(() => {
      window.location.reload();
    });
  };

  const updateStatus = (id, status) => {
    axios.put(`http://localhost:5000/api/referrals/${id}`, { status }).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Referral Portal</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-8">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Experience"
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="file"
            onChange={(e) => setFormData({ ...formData, resume: e.target.files[0] })}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit Referral
          </button>
        </form>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Referral List</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-gray-700">Experience</th>
              <th className="px-6 py-3 text-left text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((referral) => (
              <tr key={referral._id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-800">{referral.name}</td>
                <td className="px-6 py-4 text-gray-800">{referral.email}</td>
                <td className="px-6 py-4 text-gray-800">{referral.experience}</td>
                <td className="px-6 py-4 text-gray-800">{referral.status}</td>
                <td className="px-6 py-4">
                  {["New", "Evaluated", "Hired", "Rejected"].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(referral._id, status)}
                      className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
                    >
                      {status}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomePage;
