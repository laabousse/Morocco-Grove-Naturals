"use client";

import React, { useState } from "react";
import { X, Send } from "lucide-react";
import { FaRegQuestionCircle } from "react-icons/fa";

interface AskQuestionModalProps {
  productName: string;
}

const AskQuestionModal: React.FC<AskQuestionModalProps> = ({ productName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", { email, question, productName });
    setSubmitted(true);
  };

  const resetForm = () => {
    setEmail("");
    setQuestion("");
    setSubmitted(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-2 text-sm text-black hover:text-red-600 hoverEffect cursor-pointer p-2 rounded-full transition-colors duration-200 ease-in-out"
      >
        <FaRegQuestionCircle className="text-xl" />
        <span className="hidden sm:inline">Ask a question</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                Ask About {productName}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-darkGreen"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="question"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Question
                  </label>
                  <textarea
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-darkGreen"
                    placeholder={`Ask a question about ${productName}`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center bg-darkGreen text-white py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send Question
                </button>
              </form>
            ) : (
              <div className="p-6 text-center space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Question Submitted!
                </h3>
                <p className="text-gray-600">
                  We'll get back to you at {email} as soon as possible.
                </p>
                <div className="flex space-x-4 justify-center">
                  <button
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Ask Another Question
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-darkGreen text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AskQuestionModal;
