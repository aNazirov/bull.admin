import Header from "core/components/global/header";
import Sidebar from "core/components/global/sidebar";
import { PrivateRoute } from "core/components/shared";
import { AppContext } from "core/utils/contexts";
import { RoleType, SlideoverModes } from "core/utils/enums";
import { Banners } from "pages/banner";
import { Chains } from "pages/chain";
import { Contexts } from "pages/context";
import { Users } from "pages/user";
import { ShowUser } from "pages/user/show";
import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

export const Layout: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<SlideoverModes>(SlideoverModes.none);

  return (
    <>
      <AppContext.Provider value={{ open, setOpen, mode, setMode }}>
        <div className="h-full flex flex-col">
          {/* Top nav*/}
          <Header />
          {/* Bottom section */}
          <div className="min-h-0 flex-1 flex overflow-hidden">
            {/* Narrow sidebar*/}
            <Sidebar />

            {/* Main area */}
            <main className="p-3 min-w-0 flex-1 border-t border-gray-200 lg:flex">
              <section
                aria-labelledby="primary-heading"
                className="min-w-0 flex-1 h-full flex flex-col overflow-y-auto lg:order-last"
              >
                <Routes>
                  <Route
                    path="/banners"
                    element={
                      <PrivateRoute operation={[RoleType.Admin]}>
                        <Banners />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/contexts"
                    element={
                      <PrivateRoute operation={[RoleType.Admin]}>
                        <Contexts />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/users"
                    element={
                      <PrivateRoute operation={[RoleType.Admin]}>
                        <Users />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/users/show/:id"
                    element={
                      <PrivateRoute operation={[RoleType.Admin]}>
                        <ShowUser />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/chains"
                    element={
                      <PrivateRoute operation={[RoleType.Admin]}>
                        <Chains />
                      </PrivateRoute>
                    }
                  />

                  <Route path="/*" element={<Navigate to="/users" />} />
                </Routes>
              </section>
            </main>
          </div>
        </div>
      </AppContext.Provider>
    </>
  );
};
