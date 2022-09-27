import { Dialog, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { CLink, PrivateComponent } from "core/components/shared";
import React, { Fragment, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userLogout } from "core/store/global/global.thunks";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { AppContext } from "core/utils/contexts";
import { RoleType, SlideoverModes } from "core/utils/enums";
import { classNames, pageSwitch } from "core/utils/index";
import { defaultAvatar } from "core/_data/datas";
import { sidebarNavigation, userNavigation } from "core/_data/titles";
import logo from "./logo.png";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="flex-shrink-0 relative h-16 bg-white flex items-center">
      {/* Logo area */}
      <div className="absolute inset-y-0 left-0 md:static md:flex-shrink-0">
        <CLink
          to="/"
          className="flex items-center justify-center h-16 w-16 bg-orange-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-600 md:w-28"
        >
          <img className="h-8 w-auto" src={logo} alt="Workflow" />
        </CLink>
      </div>
      {/* Picker area */}
      <LinkSelect />

      {/* Menu button area */}
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center sm:pr-6 md:hidden">
        {/* Mobile menu button */}
        <button
          type="button"
          className="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-600"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <MenuIcon className="block h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Desktop nav area */}
      <DesktopMenu />

      {/* Mobile menu, show/hide this `div` based on menu open/closed state */}
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
    </header>
  );
};

const DesktopMenu: React.FC = () => {
  const { setOpen, setMode } = useContext(AppContext);
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const path = pathname.split("/").filter((x) => x);
  const mainPage = path.length <= 1;
  const page = pageSwitch(path);

  const create = () => {
    if (!mainPage) {
      return navigate(`/${path[0]}`, {
        state: { create: true },
      });
    }

    setMode(SlideoverModes.create);
    setOpen(true);
  };

  const logout = () => {
    dispatch(userLogout());
  };

  const accessRoles = [RoleType.Admin];

  return (
    <div className="hidden md:min-w-0 md:flex-1 md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <div className="ml-5 max-w-3xl relative text-black font-normal">
          {page}
        </div>
      </div>
      <div className="ml-10 pr-4 flex-shrink-0 flex items-center space-x-10">
        {/* Mobile Filter button */}
        <div className="flex items-center space-x-8">
          <span className="inline-flex gap-4">
            <PrivateComponent
              operation={["Job", "Profile"].includes(page) ? [] : accessRoles}
            >
              <span
                className="-mx-1 bg-white p-1 flex gap-2 cursor-pointer items-center rounded-full text-gray-400 hover:text-gray-500"
                onClick={create}
              >
                <span className="text-sm">Добавить {page}</span>
                <PlusCircleIcon className="h-6 w-6" aria-hidden="true" />
              </span>
            </PrivateComponent>
          </span>

          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full"
                src={defaultAvatar}
                alt="avatar"
              />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute z-30 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {/* <Menu.Item>
                    {({ active }) => (
                      <CLink
                        to={`/profile`}
                        state={{ id: user?.id }}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Your Profile
                      </CLink>
                    )}
                  </Menu.Item> */}
                  <Menu.Item>
                    {({ active }) => (
                      <span
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                        onClick={logout}
                      >
                        Sign Out
                      </span>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};

interface MobileMenuProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const LinkSelect: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="mx-auto md:hidden">
      <div className="relative">
        <label htmlFor="inbox-select" className="sr-only">
          Choose inbox
        </label>
        <select
          id="inbox-select"
          onChange={(e) => navigate(e.target.value)}
          className="rounded-md border-0 bg-none pl-3 pr-8 text-base font-medium text-gray-900 focus:ring-2 focus:ring-orange-600"
          defaultValue={
            sidebarNavigation.find((item) => item.href === pathname)?.href
          }
        >
          {sidebarNavigation.map((item) => (
            <option value={item.href} key={item.href}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const MobileMenu: React.FC<MobileMenuProps> = ({
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const { user } = useAppSelector((state) => state.global);

  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(userLogout());
  };

  return (
    <Transition.Root show={mobileMenuOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 md:hidden"
        onClose={setMobileMenuOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="hidden sm:block sm:fixed sm:inset-0 sm:bg-gray-600 sm:bg-opacity-75" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-out duration-150 sm:ease-in-out sm:duration-300"
          enterFrom="transform opacity-0 scale-110 sm:translate-x-full sm:scale-100 sm:opacity-100"
          enterTo="transform opacity-100 scale-100  sm:translate-x-0 sm:scale-100 sm:opacity-100"
          leave="transition ease-in duration-150 sm:ease-in-out sm:duration-300"
          leaveFrom="transform opacity-100 scale-100 sm:translate-x-0 sm:scale-100 sm:opacity-100"
          leaveTo="transform opacity-0 scale-110  sm:translate-x-full sm:scale-100 sm:opacity-100"
        >
          <nav
            className="fixed z-40 inset-0 h-full w-full bg-white sm:inset-y-0 sm:left-auto sm:right-0 sm:max-w-sm sm:w-full sm:shadow-lg overflow-y-scroll"
            aria-label="Global"
          >
            <div className="h-16 flex items-center justify-between px-4 sm:px-6">
              <span>
                <img
                  className="block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=500"
                  alt="Workflow"
                />
              </span>
              <button
                type="button"
                className="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close main menu</span>
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-2 max-w-8xl mx-auto px-4 sm:px-6">
              <div className="relative text-gray-400 focus-within:text-gray-500">
                {/*  */}
              </div>
            </div>
            <div className="max-w-8xl mx-auto py-3 px-2 sm:px-4">
              {sidebarNavigation.map((item) => (
                <Fragment key={item.name}>
                  <CLink
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    mainClassName="text-gray-600"
                    activeClassName="text-gray-900"
                    className="block rounded-md py-2 px-3 text-base font-medium hover:bg-gray-100"
                  >
                    {item.name}
                  </CLink>
                </Fragment>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="max-w-8xl mx-auto px-4 flex items-center sm:px-6">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={defaultAvatar}
                    alt=""
                  />
                </div>
                <div className="ml-3 min-w-0 flex-1">
                  <div className="text-base font-medium text-gray-800 truncate">
                    {user?.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500 truncate">
                    {user?.phone}
                  </div>
                </div>
              </div>
              <div className="mt-3 max-w-8xl mx-auto px-2 space-y-1 sm:px-4">
                {userNavigation.map((item) => (
                  <CLink
                    key={item.name}
                    to={item.href}
                    state={{ id: user?.id }}
                    className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-50"
                    {...(item.href === "/login" ? { onClick: logout } : {})}
                  >
                    {item.name}
                  </CLink>
                ))}
              </div>
            </div>
          </nav>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default Header;
