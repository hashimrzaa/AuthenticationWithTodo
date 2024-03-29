import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { auth, db } from "../config/Firebase/firebase.js";
import { signOut } from "firebase/auth";
import UserContexta from "../context/UserContext.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import "./navbar.css";

export default function Navbar() {
  const { isUser, setIsUser,todobg} = UserContexta();  

  const [dataArr, setdataArr] = useState();
  useEffect(() => {
    async function getData() {
      const q = query(
        collection(db, "users"),
        where("email", "==", auth.currentUser.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setdataArr(doc.data());
      });
    }
    isUser ? getData() : null;
  }, [isUser]);

  const user = dataArr
    ? { name: dataArr.name, email: dataArr.email, imageUrl: dataArr.url }
    : "";

  const userNavigation = [{ name: "Sign out", to: "login" }];

  const navigation = isUser
    ? [
        { name: "Home", to: "/" },
        { name: "Todo", to: "todo" },
      ]
    : [
        { name: "Sign Up", to: "signin" },
        { name: "Login", to: "login" },
      ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function signout() {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <>
      <div className="min-h-full">
        <Disclosure
          as="nav"
          className={`${
            todobg ? "bgcolor" : isUser ? "bg-purple-900" : "bg-gray-700"
          }`}
        >
          {({ open }) => (
            <>
              <div className="  px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://cdn-icons-png.flaticon.com/512/5540/5540603.png"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.to}
                            className={classNames(
                              "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          {isUser ? (
                            <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src={user.imageUrl}
                                alt=""
                              />
                            </Menu.Button>
                          ) : null}
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.to}
                                    onClick={() => {
                                      setIsUser(false);
                                      signout();
                                    }}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      as="a"
                      to={item.to}
                     
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {isUser ? (
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        {isUser ? (
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                        ) : null}
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">
                          {isUser ? user.name : null}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {isUser ? user.email : null}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map((item) => (
                        <Link
                          key={item.name}
                          onClick={() => {
                            setIsUser(false);
                            signout();
                          }}
                          as="a"
                          to={item.to}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
