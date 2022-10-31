import { CLink, PrivateRoute } from "core/components/shared";
import { sidebarNavigation } from "core/_data/titles";
import React from "react";

const Sidebar: React.FC = () => {
  return (
    <nav
      aria-label="Sidebar"
      className="hidden md:block md:flex-shrink-0 md:bg-blue-500 md:overflow-y-auto"
    >
      <div className="relative w-28 flex flex-col p-3 space-y-0.5">
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
