// src/FormComponent.jsx
import React, { useState } from 'react';
import axios from 'axios';

const FormComponent = () => {
  const [formData, setFormData] = useState({ uid: '', name: '', mobile: '', email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state
    setSuccess(''); // Reset success state

    try {
      const response = await axios.post('http://localhost:3000/api/form', formData);
      setSuccess(response.data);
      setFormData({ uid: '', name: '', mobile: '', email: '' }); // Reset form fields
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message); // Show specific error message from backend
      } else {
        setError('Error: Unable to submit the form.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Submit Your Info</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">UID</label>
          <input
            type="text"
            name="uid"
            value={formData.uid}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Mobile</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded">
          Submit
        </button>
      </form>
      {error && <div className="mt-4 text-red-600">{error}</div>}
      {success && <div className="mt-4 text-green-600">{success}</div>}
    </div>
  );
};

export default FormComponent;
