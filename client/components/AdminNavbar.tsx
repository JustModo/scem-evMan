import React from 'react';
import Link from 'next/link';

const AdminSidebar = () => {
  return (
    <aside className="h-screen w-64 bg-[#A0CC98] text-black p-6 flex flex-col justify-between fixed left-0 top-10 shadow-lg rounded-r-xl">
      <div>
        <div className="mb-6">
          <div className="text-3xl font-bold text-center text-black">ADMIN PANEL</div>
          <hr className="my-4 border-t-2 border-white opacity-80" />
        </div>
        <nav className="flex flex-col space-y-6">
          {['Test', 'Questions', 'Results', 'Settings'].map((item) => (
            <Link
              key={item}
              href={`/admin/${item.toLowerCase()}`}
              className="hover:bg-[#8CBA81] py-2 px-4 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
