'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems } from "./items";

const SidebarAdminPage = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 h-full bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Меню</h2>
      <ul className="space-y-4">
        {sidebarItems.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={`block p-2 rounded-md ${
                pathname === item.path ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarAdminPage;
