export default function CallToActionSection() {
  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Contact our engineering team to discuss your requirements. We'll work with you from
            concept to production.
          </p>

          {/* Contact Form Placeholder */}
          <div className="bg-gray-50 rounded-lg p-8 md:p-12 shadow-md">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-left text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-left text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-left text-sm font-medium text-gray-700 mb-2">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
                  placeholder="Tell us about your project requirements, materials, quantities, and timeline..."
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="btn-primary w-full md:w-auto px-12 py-4 text-lg"
                >
                  Send Request
                </button>
              </div>

              <p className="text-sm text-gray-500">
                * Required fields. We typically respond within 24 hours.
              </p>
            </form>
          </div>

          {/* Alternative Contact Info */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">Or reach us directly:</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm">
              <a href="mailto:info@reems.com" className="text-primary hover:underline font-medium">
                info@reems.com
              </a>
              <span className="hidden sm:inline text-gray-400">|</span>
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

