"use client";

import React from 'react'
import Link from 'next/link';


const DashboardLinks = [
    {
      id: "1",
      title: "Product",
      href: "/dashboard/product",
    },
    {
      id: "2",
      title: "Users",
      href: "/dashboard/users",
    },
  ];

const Sidebar = () => {
  return (
    <section className="flex justify-between items-center h-screen">
      <aside>
        <ul>
          {DashboardLinks.map((item) => {
            return (
              <li key={item.id}>
                <Link href={item.href}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      </aside>
      <div>
        
      </div>
    </section>
  )
}

export default Sidebar