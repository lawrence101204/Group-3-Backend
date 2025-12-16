export default function Footer() {
  return (
    <footer className="bg-[#d8f2dd] mt-12 border-t border-green-200">
      <div className="max-w-6xl mx-auto px-6 py-10 
                      grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Column 1 — Logo + Description */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img
              src="/lavera.png"
              alt="Lavera Bus Tour Logo"
              className="w-14 h-14 rounded-full object-cover shadow-md border border-green-300"
            />
            <h3 className="font-semibold text-lg text-gray-800">
              Lavera Bus Tour
            </h3>
          </div>

          <p className="text-sm text-gray-600 leading-6">
            Safe, comfortable, and memorable tours across the Philippines.
          </p>
        </div>

        {/* Column 2 — Tours */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Tours</h4>
          <ul className="space-y-2 text-sm">
            {[
              "Educational Tours",
              "Historical Tours",
              "Private Charters",
              "Group Packages",
            ].map((item) => (
              <li
                key={item}
                className="text-gray-700 hover:text-green-700 hover:underline transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Support */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            {[
              "Contact Us",
              "FAQs",
              "Terms & Conditions",
              "Privacy Policy",
            ].map((item) => (
              <li
                key={item}
                className="text-gray-700 hover:text-green-700 hover:underline transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Social Icons */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Connect With Us</h4>
          <p className="text-sm text-gray-600 mb-3">
            Stay updated with our latest tours and promos.
          </p>

          <div className="flex gap-4">

            {/* Facebook */}
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center 
                         bg-white rounded-full shadow hover:bg-green-100 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" 
                fill="none" stroke="currentColor" strokeWidth="2"
                className="text-green-700 w-5 h-5" 
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center 
                         bg-white rounded-full shadow hover:bg-green-100 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg"
                fill="none" stroke="currentColor" strokeWidth="2"
                className="text-green-700 w-5 h-5" 
                viewBox="0 0 24 24"
              >
                <rect x="4" y="4" width="16" height="16" rx="5"/>
                <circle cx="12" cy="12" r="3"/>
                <circle cx="17" cy="7" r="1.4" fill="currentColor"/>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center 
                         bg-white rounded-full shadow hover:bg-green-100 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" 
                className="text-green-700 w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path d="M21.8 8.001a3 3 0 0 0-2.1-2.12C17.6 5.5 12 5.5 12 5.5s-5.6 0-7.7.38A3 3 0 0 0 2.2 8.001C2 9.3 2 12 2 12s0 2.7.2 4c.2 1.29 1.1 2.26 2.1 2.62C6.4 19 12 19 12 19s5.6 0 7.7-.38a3 3 0 0 0 2.1-2.62c.2-1.3.2-4 .2-4s0-2.7-.2-4ZM10 15.5v-7l6 3.5-6 3.5Z"/>
              </svg>
            </a>

            {/* Globe */}
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center 
                         bg-white rounded-full shadow hover:bg-green-100 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg"
                fill="none" stroke="currentColor" strokeWidth="2"
                className="text-green-700 w-6 h-6"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10"/>
              </svg>
            </a>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center py-4 text-sm text-gray-600 border-t border-green-200">
        © {new Date().getFullYear()} Lavera Bus Tour — All Rights Reserved.
      </div>
    </footer>
  );
}
