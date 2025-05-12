'use client';

import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header>
      <nav style={{ backgroundColor: "rgb(0, 184, 143)", padding: "20px" }}>
        <ul style={{ display: "flex", justifyContent: "space-between", alignItems: "center", listStyle: "none", margin: 0, padding: 0 }}>
          <li>
            <Link href="/home">
              <span className="nav-link">Home</span>
            </Link>
          </li>
          <li>
            <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
              <span className="separator">||</span>
              <Link href="/Sign_In">
                <span className="nav-link">SignIn</span>
              </Link>
              <span className="separator">||</span>
              <Link href="/profile">
                <span className="nav-link">Profile</span>
              </Link>
              <span className="separator">||</span>
            </div>
          </li>
        </ul>
      </nav>

      <style jsx>{`
        .nav-link {
          color: white; /* Change text color to white */
          text-decoration: none;
          cursor: pointer;
          transition: color 0.3s ease;
          font-size: 18px; /* Increase the font size */
        }
        .nav-link:hover {
          color: blue;
        }
        .separator {
          font-weight: bold;
          color: white; /* Ensure separators are also white */
          font-size: 18px; /* Increase the font size of separators */
        }
      `}</style>
    </header>
  );
}
