import React from "react";

const Footer=()=> {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: "Find Parking", href: "#find" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Support", href: "#support" },
    { label: "Privacy Policy", href: "#privacy" },
  ];

  return (
    <footer className="w-full bg-slate-700 border-t  text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5">
            {/* <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-base shadow-sm">
              P
            </div> */}
            <div className="text-left">
              <span className="text-base font-semibold text-white tracking-tight">
                ParkEase
              </span>
              <p className="text-xs text-slate-500">Smart parking made effortless</p>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-xs text-slate-500 text-center md:text-right">
            &copy; {currentYear} ParkEase, Inc. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}

export default Footer