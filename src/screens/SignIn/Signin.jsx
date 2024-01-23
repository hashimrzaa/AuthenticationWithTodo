import { PhotoIcon } from "@heroicons/react/24/solid";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, storage } from "../../config/Firebase/firebase";
import { useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { SendData } from "../../config/Firebase/firebase";

export default function Signin() {
  const namee = useRef();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  let [imgurl, setimgurl] = useState();

  const register = (event) => {
    event.preventDefault();

    const registerName = namee.current.value;
    const registerEmail = email.current.value;
    const registerPassword = password.current.value;
    const user = {
      name: registerName,
      email: registerEmail,
      password:registerPassword,
      url: imgurl,
    };

    SendData(user, "users");
    
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  let file = [];

  function addFile() {
    const files = file[0][0];
 
    const storageRef = ref(storage, email.current.value);
    uploadBytes(storageRef, files)
      .then(() => {
        getDownloadURL(storageRef)
          .then((url) => {
            setimgurl(`${url}`);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div
        className="flex h-[94vh] min-h-full flex-1 flex-col justify-center lg:px-8 overflow-auto"
        style={{
          backgroundImage:
            'URL("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSGq87xu7Ki0L1cGYPQ0QHEtAc-nG8c4z7XJVNoAtFySwuAFVPVl4JTiVcOhTCIG0SKtg&usqp=CAU")',
          backgroundSize: "cover",
        }}
      >
        <div className="sm:mx-auto  sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://cdn-icons-png.flaticon.com/512/5540/5540603.png"
            alt="Your Company"
          />
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6 mx-2"
            onSubmit={(e) => {
              e.preventDefault()
              imgurl ?register(e):alert("submit the file first")
            }}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium  text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  ref={namee}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="p-[4px] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium  text-gray-900"
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
                  className="block text-sm font-medium  text-gray-900"
                >
                  Password
                </label>
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
              <label
                htmlFor="file"
                className="block text-sm font-medium  text-gray-900"
              >
                profile photo
              </label>
              <div className="mt-2 flex gap-2 justify-between  items-center">
              
                <input
                  id="file"
                  type="file"
                  accept="image/*"
                  autoComplete="file"
                  required
                  onChange={(e) => {
                    file.push(e.target.files);
                  }}
                  className="bg-white file:border-0 file:focus-visible:outline-indigo-600 file:hover:bg-indigo-500 file:w-[50%] file:p-[4px] block   rounded-md border-0 file:bg-indigo-600 file:text-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
           
              <button className="text-white rounded hover:bg-indigo-500 border-black px-3 border-0 bg-indigo-600 h-[30px]" onClick={(e)=>{
                e.preventDefault()
                email.current.value.length > 0 ?addFile():alert("please fill the email first")
              }}>submit</button>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="mb-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
