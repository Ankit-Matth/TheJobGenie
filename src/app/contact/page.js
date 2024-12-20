"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";

const Page = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [shake, setShake] = useState(false);

  const handleFullNameChange = (e) => setFullName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/contact", { fullName, email, description });
      setShowModal(true);
      document.body.style.overflow = "hidden"; // Disable scrolling
    } catch (error) {
      console.log(error)
    }
  };

  const closeModal = () => {
    setFullName("");
    setEmail("");
    setDescription("");
    setShowModal(false);
    document.body.style.overflow = "auto"; // Enable scrolling
    setShake(false);
  };

  // Function to trigger shake animation
  const handleOverlayClick = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500); // Remove shake class after animation ends
  };

  const ConfirmationModal = ({ onClose }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-gray-900 bg-opacity-50" onClick={handleOverlayClick}>
        <div className="relative w-auto max-w-lg mx-auto my-6">
          <div className={`bg-white rounded-lg shadow-lg flex flex-col p-6 relative ${
              shake ? 'animate-shake' : ''
            }`} onClick={(e) => e.stopPropagation()} >
            <button
              className="absolute top-2 right-5 text-4xl text-gray-500 hover:text-gray-700"
              onClick={onClose}
              aria-label="Close modal"
            >
              &times; {/* Close icon */}
            </button>
            <h2 className="text-2xl font-semibold mb-4">Thank You!</h2>
            <p className="text-gray-700 text-lg mb-8">
              Your submission has been received successfully. We will contact you soon.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {showModal && <ConfirmationModal onClose={closeModal} />}
      <div className="min-h-screen flex flex-col items-center justify-center py-12">
        <div className="bg-white rounded-lg w-full max-w-5xl">
          <p className="text-4xl text-gray-800 mb-14 text-center">
            We’re here to help! Reach out to us anytime.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-3/5 pr-6">
              <form onSubmit={handleSubmit} className="space-y-2">
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div className="relative font-medium">
                        <input
                          type="text"
                          className="peer w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                          id="fullName"
                          value={fullName}
                          onChange={handleFullNameChange}
                          required
                        />
                        <label
                          htmlFor="fullName"
                          className={`absolute left-4 transition-all duration-300 text-gray-600 ${
                            fullName
                              ? "text-sm top-1"
                              : "top-4 text-gray-600 peer-focus:text-sm peer-focus:top-1 peer-focus:text-blue-500"
                          }`}
                        >
                          Full Name
                        </label>
                      </div>
                      <div className="relative font-medium">
                        <input
                          type="email"
                          className="peer w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                          id="email"
                          value={email}
                          onChange={handleEmailChange}
                          required
                        />
                        <label
                          htmlFor="email"
                          className={`absolute left-4 transition-all duration-300 text-gray-600 ${
                            email
                              ? "text-sm top-1"
                              : "top-4 text-gray-600 peer-focus:text-sm peer-focus:top-1 peer-focus:text-blue-500"
                          }`}
                        >
                          Email Address
                        </label>
                      </div>
                    </div>
                    <div className="relative font-medium">
                      <textarea
                        className="peer w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        rows="4"
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        required
                      ></textarea>
                      <label
                        htmlFor="description"
                        className={`absolute left-4 transition-all duration-300 text-gray-600 ${
                          description
                            ? "text-sm top-1"
                            : "top-4 text-gray-600 peer-focus:text-sm peer-focus:top-1 peer-focus:text-blue-500"
                        }`}
                      >
                        Message
                      </label>
                    </div>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300 w-full text-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
            <div className="w-full md:w-2/5">
              <Image
                src="/images/contact.jpg" // Replace with your actual image path
                alt="Contact Us"
                width={400}
                height={300}
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Enhanced Address Section */}
          <div className="mt-12 text-center bg-gray-100 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">The Job Genie Office</h3>
            <p className="text-lg text-gray-700">Sector 63, D-44</p>
            <p className="text-lg text-gray-700">Noida, Uttar Pradesh 201301</p>
            <p className="text-lg text-gray-700">Phone: (0120) 123-4567</p>
            <p className="text-lg text-gray-700 mb-2">
              Email: <a href="mailto:jobgenie@gmail.com" className="text-blue-500">jobgenie@gmail.com</a>
            </p>
            <p className="text-sm text-gray-600 italic">
              Your trusted partner in job placements and recruitment.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
