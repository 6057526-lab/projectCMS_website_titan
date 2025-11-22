"use client";

import { useState, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export default function CallToActionSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Basic client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        // Reset form after success
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection.");
    }
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Request a project review
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Contact our engineering team to discuss your requirements. We'll work with you from
            concept to production.
          </p>

          {/* Contact Form Container */}
          <div className="bg-gray-50 rounded-lg p-8 md:p-12 shadow-sm border border-gray-100">
            {status === "success" ? (
              <div className="py-12 flex flex-col items-center justify-center text-center animate-fadeIn">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Sent</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for your interest. We will get back to you within 1–2 business days.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-primary font-medium hover:underline"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-left">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={status === "loading"}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition disabled:bg-gray-100 disabled:text-gray-500"
                    />
                  </div>
                  <div className="text-left">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={status === "loading"}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition disabled:bg-gray-100 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div className="text-left">
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition disabled:bg-gray-100 disabled:text-gray-500"
                  />
                </div>

                <div className="text-left">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Project Requirements <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={status === "loading"}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition resize-none disabled:bg-gray-100 disabled:text-gray-500"
                    placeholder="Example: 500 forged magnesium wheels, delivery Q2 2025, automotive application."
                  ></textarea>
                </div>

                {status === "error" && (
                  <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm text-left">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className={`w-full md:w-auto px-10 py-4 text-base font-semibold text-white bg-primary rounded-sm shadow-sm hover:bg-primary-dark transition-all duration-200 flex items-center justify-center mx-auto ${
                      status === "loading" ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {status === "loading" ? (
                      <>
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
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Send Request"
                    )}
                  </button>
                  <p className="text-sm text-gray-500 mt-4">
                    We will get back to you within 1–2 business days.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Alternative Contact Info */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">Or reach us directly:</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm">
              <a href="mailto:info@reems.com" className="text-primary hover:underline font-medium">
                info@reems.com
              </a>
              <span className="hidden sm:inline text-gray-300">|</span>
              <a href="tel:+1234567890" className="text-primary hover:underline font-medium">
                +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
