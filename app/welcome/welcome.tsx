import { useState } from "react";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import { CiMenuBurger } from "react-icons/ci";
import { FaXmark } from "react-icons/fa6";

export function Welcome() {
  const [menuOpen, setMenuState] = useState(false);

  const openMenu = () => {
    return setMenuState(true);
  };

  const closeMenu = () => {
    return setMenuState(false);
  };
  return (
    <>
      <main className="flex items-center justify-center pt-16 pb-4">
        <CiMenuBurger
          className="fixed top-0 right-0 p-3"
          size="4rem"
          onClick={openMenu}
        />
        <div
          className={`ease fixed top-0 right-0 h-screen w-xs overflow-y-auto bg-white shadow transition-transform delay-150 duration-300 ${menuOpen ? "" : "translate-x-[100%]"}`}
        >
          <FaXmark
            className="absolute top-0 right-0 p-3"
            size="4rem"
            onClick={closeMenu}
          />
          <h2 className="m-5 text-lg">ページ一覧</h2>
          <ul className="ml-5">
            {resources.map(({ href, text }) => (
              <li key={href} className="mb-3">
                <a
                  className="text-blue-700 hover:underline dark:text-blue-500"
                  href={href}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex min-h-0 flex-1 flex-col items-center gap-16">
          <header className="flex flex-col items-center gap-9">
            <div className="w-[500px] max-w-[100vw] p-4">
              <img
                src={logoLight}
                alt="React Router"
                className="block w-full dark:hidden"
              />
              <img
                src={logoDark}
                alt="React Router"
                className="hidden w-full dark:block"
              />
            </div>
          </header>
          <div className="w-full max-w-[300px] space-y-6 px-4">
            <nav className="space-y-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
              <p className="text-center leading-6 text-gray-700 dark:text-gray-200">
                What&apos;s next?
              </p>
              <ul>
                {resources.map(({ href, text }) => (
                  <li key={href}>
                    <a
                      className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </main>
      <div className="h-[800px]"></div>
    </>
  );
}

const resources = [
  {
    href: "/mypage",
    text: "My Page",
  },
  {
    href: "/signin",
    text: "Sign In",
  },
  {
    href: "/signout",
    text: "Sign Out",
  },
  {
    href: "/detail",
    text: "Detail",
  },
];
