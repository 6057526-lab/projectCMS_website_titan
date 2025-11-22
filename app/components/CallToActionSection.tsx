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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Request a project review
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
            Contact our engineering team to discuss your requirements. We'll work with you from
            concept to production.
          </p>

          <div className="bg-gray-50 rounded-xl p-6 md:p-10 shadow-sm border border-gray-100">
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
                  Thank you. We will get back to you within 1–2 business days.
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
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition disabled:bg-gray-100 disabled:text-gray-500 text-base" 
                      /* text-base prevents iOS zoom on focus */
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
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition disabled:bg-gray-100 disabled:text-gray-500 text-base"
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
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition disabled:bg-gray-100 disabled:text-gray-500 text-base"
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
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition resize-none disabled:bg-gray-100 disabled:text-gray-500 text-base"
                    placeholder="Briefly describe your project needs..."
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
                    className={`w-full md:w-auto px-10 py-4 text-base font-semibold text-white bg-primary rounded-md shadow-sm hover:bg-primary-dark transition-all duration-200 flex items-center justify-center mx-auto min-h-[50px] ${
                      status === "loading" ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {status === "loading" ? "Sending..." : "Send Request"}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="mt-10 pt-8 border-t border-gray-200">
            <p className="text-gray-500 mb-4 text-sm">Direct contact:</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 text-base">
              <a href="mailto:info@reems.com" className="text-primary hover:underline font-medium py-2">
                info@reems.com
              </a>
              <span className="hidden sm:inline text-gray-300 self-center">|</span>
              <a href="tel:+1234567890" className="text-primary hover:underline font-medium py-2">
                +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
