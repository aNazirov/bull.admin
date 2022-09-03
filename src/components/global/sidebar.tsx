import { CLink, PrivateRoute } from "components/shared";
import React from "react";
import { sidebarNavigation } from "_data/titles";

const Sidebar: React.FC = () => {
  return (
    <nav
      aria-label="Sidebar"
      className="hidden md:block md:flex-shrink-0 md:bg-blue-600 md:overflow-y-auto"
    >
      <div className="relative w-20 flex flex-col p-3 space-y-0.5">
        {sidebarNavigation.map((item, idx) => (
          <PrivateRoute operation={item.permissions} key={item.name + idx}>
            <CLink
              to={item.href}
              className={
                "group w-full p-3 rounded-md flex flex-col items-center text-xs font-normal relative"
              }
              mainClassName={"text-blue-100 hover:bg-blue-800 hover:text-white"}
              activeClassName={"bg-blue-800 text-white"}
            >
              <item.icon className={"h-6 w-6"} aria-hidden="true" />
              <span className="mt-2">{item.name}</span>
            </CLink>
          </PrivateRoute>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
