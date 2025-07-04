import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-10 animate-fade-in">
        <h1 className="text-4xl font-bold text-blue-900 mb-4 text-center">📬 Contact Us</h1>
        <p className="text-lg text-gray-800 mb-8 text-center">
          Got questions, feedback, or partnership ideas? We'd love to hear from you.
          Fill out the form below or reach out through the contacts provided.
        </p>

        <form className="space-y-5">
          <div>
            <label className="block font-medium mb-1 text-blue-800">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-blue-800">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-blue-800">Message</label>
            <textarea
              placeholder="Type your message here..."
              className="w-full px-4 py-2 border rounded-md h-32 resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition duration-200 w-full sm:w-auto"
          >
            ✉️ Send Message
          </button>
        </form>

        <hr className="my-10 border-t border-blue-200" />

        <div className="text-gray-700 text-sm space-y-2 text-center sm:text-left">
          <p>📧 <strong>Email:</strong>eliahmwelangi01@gmail.com</p>
          <p>📍 <strong>Location:</strong> Dar es Salaam, Tanzania</p>
          <p>⏰ <strong>Hours:</strong> Mon – Fri, 9:00 AM – 5:00 PM</p>
          <p>
            💼 <strong>GitHub:</strong>{' '}
            <a
              href="https://github.com/okedo01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              github.com/okedo01
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
