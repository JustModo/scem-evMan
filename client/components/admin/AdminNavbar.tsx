import React from 'react';
import Link from 'next/link';

const AdminTopbar = () => {
  return (
    <header className="w-full bg-green-200 text-black px-6 py-3 shadow-md left-0 top-16 z-50 flex justify-center">
      <nav className="flex space-x-20">
        {['Test', 'Questions', 'Results', 'Settings'].map((item) => (
          <Link
            key={item}
            href={`/admin/${item.toLowerCase()}`}
            className="font-medium hover:underline"
          >
            {item}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default AdminTopbar;
