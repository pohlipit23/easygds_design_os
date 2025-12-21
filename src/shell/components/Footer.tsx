import React from 'react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-stone-200 py-6 mt-auto">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-600">
        <p>&copy; 2025 easyGDS. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#203C94] transition-colors">
            Terms & Conditions
          </a>
          <a href="#" className="hover:text-[#203C94] transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-[#203C94] transition-colors">
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
