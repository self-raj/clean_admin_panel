import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    phone: "",
    phone_2: "",
    email: "",
    landline: "",
    addresses: [
      { type: "headOffice", address: "", city: "", pincode: "" ,mapUrl: ""},
      { type: "branchOffice", address: "", city: "", pincode: "",mapUrl: "" },
    ],
  });

  const [loading, setLoading] = useState(false); // Loader state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (index, e) => {
    const newAddresses = [...formData.addresses];
    newAddresses[index][e.target.name] = e.target.value;
    setFormData({ ...formData, addresses: newAddresses });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Loader 

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      
      setTimeout(async () => {
        setLoading(false); 

        if (!response.ok) {
          throw new Error("Failed to save contact");
        }

        const result = await response.json();
        console.log("Saved contact:", result);
        alert(" Contact saved successfully!");

        // Reset form
        setFormData({
          phone: "",
          phone_2: "",
          email: "",
          landline: "",
          addresses: [
            { type: "headOffice", address: "", city: "", pincode: "" ,mapUrl: "" },
            { type: "branchOffice", address: "", city: "", pincode: "" ,mapUrl: "" },
          ],
        });
      }, 3000); // 3 सेकंड delay
    } catch (error) {
      setLoading(false);
      console.error("Error saving contact:", error);
      alert(" Failed to save contact info. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Contact Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Phone */}
        <div>
          <label className="block font-medium"> Main Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder="Enter phone number"
            required
          />
        </div>

        {/* Phone 2 */}
        <div>
          <label className="block font-medium">Secondary Phone</label>
          <input
            type="text"
            name="phone_2"
            value={formData.phone_2}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder="Enter second phone number"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder="Enter email"
            required
          />
        </div>

        {/* Landline */}
        <div>
          <label className="block font-medium">Landline</label>
          <input
            type="text"
            name="landline"
            value={formData.landline}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder="Enter landline"
          />
        </div>

        {/* Head Office */}
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold mb-2">Head Office Address</h3>
          <textarea
            name="address"
            value={formData.addresses[0].address}
            onChange={(e) => handleAddressChange(0, e)}
            className="w-full border rounded px-3 py-2 mb-2"
            placeholder="Address"
            required
          />
          <input
            type="text"
            name="city"
            value={formData.addresses[0].city}
            onChange={(e) => handleAddressChange(0, e)}
            className="w-full border rounded px-3 py-2 mb-2"
            placeholder="City"
            required
          />
          <input
            type="number"
            name="pincode"
            value={formData.addresses[0].pincode}
            onChange={(e) => handleAddressChange(0, e)}
            className="w-full border rounded px-3 py-2"
            placeholder="Pincode"
            required
          />

          <input
            type="text"
            name="mapUrl"
            value={formData.addresses[0].mapUrl}
            onChange={(e) => handleAddressChange(0, e)}
            className="w-full border rounded px-3 py-2 mt-2"
            placeholder="Google Map Embed URL"
            required
          />
        </div>

        {/* Branch Office */}
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold mb-2">Branch Office Address</h3>
          <textarea
            name="address"
            value={formData.addresses[1].address}
            onChange={(e) => handleAddressChange(1, e)}
            className="w-full border rounded px-3 py-2 mb-2"
            placeholder="Address"
          />
          <input
            type="text"
            name="city"
            value={formData.addresses[1].city}
            onChange={(e) => handleAddressChange(1, e)}
            className="w-full border rounded px-3 py-2 mb-2"
            placeholder="City"
          />
          <input
            type="number"
            name="pincode"
            value={formData.addresses[1].pincode}
            onChange={(e) => handleAddressChange(1, e)}
            className="w-full border rounded px-3 py-2"
            placeholder="Pincode"
          />
          <input
            type="text"
            name="mapUrl"
            value={formData.addresses[1].mapUrl}
            onChange={(e) => handleAddressChange(1, e)}
            className="w-full border rounded px-3 py-2 mt-2"
            placeholder="Google Map Embed URL"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading} // Loading में disable
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex justify-center"
        >
          {loading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Saving...
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}
