import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    email: "",
    body: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!formData.fullName || formData.fullName.length < 3) {
      errors.fullName = "Full name must be at least 3 characters long";
      formIsValid = false;
    }

    if (!formData.subject || formData.subject.length < 3) {
      errors.subject = "Subject must be at least 3 characters long";
      formIsValid = false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email must be a valid email address";
      formIsValid = false;
    }

    if (!formData.body || formData.body.length < 3) {
      errors.body = "Body must be at least 3 characters long";
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form data submitted:", formData);
      setShowModal(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-full max-w-md">
        <h3 className="text-2xl font-bold text-center">Contact us</h3>
        <form onSubmit={handleSubmit} className="space-y-5 mt-5" noValidate>
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 border rounded-md focus:border-blue-400 focus:ring-blue-400"
              required
            />
            {errors.fullName && (
              <p className="text-xs text-red-500">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 border rounded-md focus:border-blue-400 focus:ring-blue-400"
              required
            />
            {errors.subject && (
              <p className="text-xs text-red-500">{errors.subject}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 border rounded-md focus:border-blue-400 focus:ring-blue-400"
              required
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="body"
              className="block text-sm font-medium text-gray-700"
            >
              Body
            </label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 border rounded-md focus:border-blue-400 focus:ring-blue-400"
              required
            ></textarea>
            {errors.body && (
              <p className="text-xs text-red-500">{errors.body}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Send Message
          </button>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h4 className="text-lg font-medium">
              Thank you for contacting us!
            </h4>
            <p className="text-sm my-2">We will get back to you shortly.</p>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
