import { Link } from "react-router-dom";
import {
  BillsIcon,
  DashboardIcon,
  HotelsIcon,
  ReportsIcon,
  SettingsIcon,
} from "../../app/Icons";
import { useState } from "react";

const navItems = [
  {
    route: "dashboard",
    icon: <DashboardIcon />,
  },
  {
    route: "hotels",
    icon: <HotelsIcon />,
  },

  {
    route: "reports",
    icon: <ReportsIcon />,
  },

  {
    route: "bills",
    icon: <BillsIcon />,
  },

  {
    route: "settings",
    icon: <SettingsIcon />,
  },
];

export default function AdminNavbar() {
  const [selectedRoute, setSelectedRoute] = useState("dashboard");

  return (
    <nav className="admin-navbar w-100 p-2 d-flex flex-column">
      {navItems.map((item, key) => {
        return (
          <Link
            className={`nav-items py-3 px-3 rounded-2 mb-3 ${
              selectedRoute == item.route ? "selected" : ""
            }`}
            key={`nav-${key}`}
            
            to={`/admin/${item.route}`}
            onClick={()=>setSelectedRoute(item.route)}
          >
            {item.icon}
            <span className="ms-3 text-capitalize">{item.route}</span>
          </Link>
        );
      })}
    </nav>
  );
}
