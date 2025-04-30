// AdminNavbar.tsx
import React from 'react';
import Link from 'next/link';

const AdminNavbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-green-900 text-white">
      <div className="flex items-center space-x-4">
         {/* <img src="/logo.png" alt="Logo" className="h-8" />*/}
        <span className="text-lg font-semibold">Admin Panel</span>
      </div>

      <div className="flex space-x-6">
        <Link href="/admin/test" className="hover:text-gray-300">Test</Link>
        <Link href="/admin/questions" className="hover:text-gray-300">Questions</Link>
        <Link href="/admin/results" className="hover:text-gray-300">Results</Link>
        <Link href="/admin/settings" className="hover:text-gray-300">Settings</Link>
      </div>
    </nav>
  );
};

export default AdminNavbar;
