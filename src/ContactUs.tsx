import React from 'react';

const ContactUs: React.FC = () => {
  return (
    <div className="bg-slate-900 text-white pt-12 min-h-screen">
      <div className="text-center pb-12">
        <h1 className="text-5xl font-bold text-cyan-200">Contact Us!</h1> 
        <p className="text-xl mt-4 text-cyan-100">We're here to help and answer any question you might have. We look forward to hearing from you.</p>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-2 gap-4 container p-12 bg-slate-800 rounded-lg shadow-xl max-w-4xl"> 
          <div>
            <h2 className="text-3xl font-bold mb-4 text-cyan-200">Reach Out to Us</h2>
            <p className="mb-2">Whether you have a question about our website, need assistance, or just want to give us feedback, here's how to reach us:</p>
            <div>
              <h3 className="text-xl font-bold text-cyan-200">Contact Information</h3>
              <ul className="list-none mt-2">
                <li><strong>Email:</strong> dummy@askteamforouremail.com</li>
                <li><strong>Phone:</strong> (xxx) xxx-xxxx</li>
                <li><strong>Address:</strong> Need an address?, ATL, GA</li>
              </ul>
            </div>
          </div>
          <div>
            <form className="flex flex-col">
              <label htmlFor="name" className="mb-2">Your Name</label>
              <input type="text" id="name" className="mb-4 p-2 rounded text-gray-700" placeholder="Your Name..." />

              <label htmlFor="email" className="mb-2">Your Email</label>
              <input type="email" id="email" className="mb-4 p-2 rounded text-gray-700" placeholder="Your Name..." />

              <label htmlFor="message" className="mb-2">Your Message</label>
              <textarea id="message" className="mb-6 p-2 rounded text-gray-700" placeholder="Type your message here..." rows={4}></textarea>

              <button type="submit" className="p-2 bg-cyan-500 rounded hover:bg-cyan-400 transition duration-300">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
