import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-blue-900 mb-4">📬 Contact Us</h1>

      <p className="text-lg text-gray-800 mb-6">
        Got questions, feedback, or partnership ideas? We'd love to hear from you. Fill out the form below or connect with us directly!
      </p>

      <form className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Message</label>
          <textarea
            placeholder="Type your message here..."
            className="w-full px-3 py-2 border rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-700 text-white px-5 py-2 rounded-md hover:bg-blue-800 transition duration-200"
        >
          Send Message
        </button>
      </form>

      <div className="mt-10 text-gray-700 space-y-1">
        <p>📧 Email: support@studenthub.com</p>
        <p>📍 Location: Dar es Salaam, Tanzania</p>
        <p>⏰ Working Hours: Mon - Fri, 9:00 AM - 5:00 PM</p>
        <p>
          💼 GitHub:{' '}
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
  );
};

export default Contact;
