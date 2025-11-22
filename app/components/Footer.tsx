export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="container-custom py-10 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
          {/* Logo and Description */}
          <div className="max-w-md">
            <h3 className="text-2xl font-bold text-white mb-2">REEMS</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Race & Engineering Elite Manufacturing Services — Advanced light-alloy solutions for
              high-performance industries.
            </p>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-500">
            <p>&copy; {currentYear} REEMS. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
