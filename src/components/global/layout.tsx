import Header from "components/global/header";
import Sidebar from "components/global/sidebar";
import { PrivateRoute } from "components/shared";
import { Acters } from "pages/acter";
import { Categories } from "pages/category";
import { Directors } from "pages/director";
import { Genres } from "pages/genre";
import { Movies } from "pages/movie";
import { ShowMovie } from "pages/movie/show";
import { Producers } from "pages/producer";
import { Users } from "pages/user";
import { ShowUser } from "pages/user/show";
import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppContext } from "utils/contexts";
import { RoleType, SlideoverModes } from "utils/enums";

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
                    path="/genres"
                    element={
                      <PrivateRoute
                        operation={[RoleType.Admin, RoleType.Moderator]}
                      >
                        <Genres />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/acters"
                    element={
                      <PrivateRoute
                        operation={[RoleType.Admin, RoleType.Moderator]}
                      >
                        <Acters />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/producers"
                    element={
                      <PrivateRoute
                        operation={[RoleType.Admin, RoleType.Moderator]}
                      >
                        <Producers />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/directors"
                    element={
                      <PrivateRoute
                        operation={[RoleType.Admin, RoleType.Moderator]}
                      >
                        <Directors />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/categories"
                    element={
                      <PrivateRoute
                        operation={[RoleType.Admin, RoleType.Moderator]}
                      >
                        <Categories />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/users"
                    element={
                      <PrivateRoute
                        operation={[RoleType.Admin, RoleType.Moderator]}
                      >
                        <Users />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/users/show/:id"
                    element={
                      <PrivateRoute
                        operation={[RoleType.Admin, RoleType.Moderator]}
                      >
                        <ShowUser />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/movies"
                    element={
                      <PrivateRoute
                        operation={[RoleType.Admin, RoleType.Moderator]}
                      >
                        <Movies />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/movies/show/:id"
                    element={
                      <PrivateRoute
                        operation={[RoleType.Admin, RoleType.Moderator]}
                      >
                        <ShowMovie />
                      </PrivateRoute>
                    }
                  />

                  <Route path="/*" element={<Navigate to="/movies" />} />
                </Routes>
              </section>
            </main>
          </div>
        </div>
      </AppContext.Provider>
    </>
  );
};
