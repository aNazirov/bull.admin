import Header from "@components/global/header";
import Sidebar from "@components/global/sidebar";
import { AppContext } from "@utils/contexts";
import { SlideoverModes } from "@utils/enums";
import React, { useState } from "react";
import { Routes } from "react-router-dom";

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
                <Routes>{}</Routes>
              </section>
            </main>
          </div>
        </div>
      </AppContext.Provider>
    </>
  );
};
