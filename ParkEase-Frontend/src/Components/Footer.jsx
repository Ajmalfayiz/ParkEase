import React from "react";

const Footer=()=> {
  const currentYear = new Date().getFullYear();

 
  return (
    <footer className="w-full bg-slate-700 border-t  text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-around gap-6">
          
          <div className="flex items-center gap-2.5">
            <div className="text-left">
              <span className="text-base font-semibold text-white tracking-tight">
                ParkEase
              </span>
              <p className="text-xs text-slate-500">Smart parking made effortless</p>
            </div>
          </div>

         
          <p className="text-xs text-slate-500 text-center md:text-right">
            &copy; {currentYear} ParkEase, Inc. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}

export default Footer