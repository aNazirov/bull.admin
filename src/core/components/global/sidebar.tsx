import { CLink, PrivateRoute } from "core/components/shared";
import React from "react";
import { sidebarNavigation } from "core/_data/titles";

const Sidebar: React.FC = () => {
  return (
    <nav
      aria-label="Sidebar"
      className="hidden md:block md:flex-shrink-0 md:bg-orange-500 md:overflow-y-auto"
    >
      <div className="relative w-28 flex flex-col p-3 space-y-0.5">
        {sidebarNavigation.map((item, idx) => (
          <PrivateRoute operation={item.permissions} key={item.name + idx}>
            <CLink
              to={item.href}
              className={
                "group w-full p-3 rounded-md flex flex-col items-center text-xs font-normal relative"
              }
              mainClassName={
                "text-blue-100 hover:bg-orange-800 hover:text-white"
              }
              activeClassName={"bg-orange-800 text-white"}
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