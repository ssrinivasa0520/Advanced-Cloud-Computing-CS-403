"use client";

import Routes from "@/constants/routes.constants";
import useUser from "@/hooks/useUser";
import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import Link from "next/link";

const BrandLogo = () => {
  return (
    <>
      <a href="#" className="flex items-center">
        <Image
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3"
          alt="Logo"
          width={30}
          height={30}
        />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          UAB File Upload
        </span>
      </a>
    </>
  );
};

const HamburgerButton = () => {
  return (
    <>
      <button
        data-collapse-toggle="navbar-solid-bg"
        type="button"
        className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-solid-bg"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </>
  );
};

type NavbarMenuButtonConfig = { label: string; link: Url };

const NavbarMenuButton = ({ label, link }: NavbarMenuButtonConfig) => {
  return (
    <li className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
      <Link href={link}>{label}</Link>
    </li>
  );
};

const NavbarMenu = ({ options }: { options: NavbarMenuButtonConfig[] }) => {
  const menuButtons = options.map((option) => (
    <NavbarMenuButton {...option} key={`${option.label}-${option.link}`} />
  ));
  return (
    <>
      <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
        <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
          {menuButtons}
        </ul>
      </div>
    </>
  );
};

const Navbar = () => {
  const { isAuthenticated } = useUser();

  const NAVBAR_MENU_OPTIONS = isAuthenticated
    ? [
        {
          label: "Upload",
          link: Routes.upload,
        },
        {
          label: "Attachments",
          link: Routes.attachments,
        },
        {
          label: "Logout",
          link: Routes.logout,
        },
      ]
    : [
        {
          label: "Login",
          link: Routes.login,
        },
      ];

  return (
    <nav className="border-gray-200 bg-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <BrandLogo />
        <HamburgerButton />
        <NavbarMenu options={NAVBAR_MENU_OPTIONS} />
      </div>
    </nav>
  );
};

export default Navbar;
