function Navbar() {
  return (
    <nav className="sticky top-0 bg-white shadow-sm z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex flex-row items-center justify-center gap-2">
            <img
              src="./logo.png"
              alt="AI VideoTranscriber Logo"
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-xl font-semibold text-gray-900 leading-none tracking-tight">
              AI VideoTranscriber
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {["Home", "Upload", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-50"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
