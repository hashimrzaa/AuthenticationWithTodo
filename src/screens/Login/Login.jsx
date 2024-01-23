import { signInWithEmailAndPassword } from "firebase/auth";
import { auth  } from "../../config/Firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import React, { useRef } from "react";

export default function Login() {
  const email = useRef();
  const password = useRef();

  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();
    const Email = email.current.value;
    const Password = password.current.value;
    signInWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode);
      });
  };

  return (
    <>
      <div
        className="flex h-[94vh] min-h-full flex-1 flex-col justify-center  lg:px-8"
        style={{
          backgroundImage:
            'URL("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSGq87xu7Ki0L1cGYPQ0QHEtAc-nG8c4z7XJVNoAtFySwuAFVPVl4JTiVcOhTCIG0SKtg&usqp=CAU")',
          backgroundSize: "cover",
        }}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://cdn-icons-png.flaticon.com/512/5540/5540603.png"
            alt="Your Company"
          />
          <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6 mx-2"
            onSubmit={(e) => {
              login(e);
            }}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  ref={email}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="p-[4px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/signin"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Create account?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  ref={password}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="p-[4px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
