import React, { useState } from "react";
import classes from "./ParentLogin.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { userAction } from "../state/State";

const TeacherLogin = (prop) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  //   const userDetail = useSelector((state) => state.userProfile.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  async function login() {
    let data = JSON.stringify({ password: password, email: email });
    console.log("data", data);

    const user = await fetch(`http://localhost:3432/teacher/logIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: data,
    })
      .then((res) => {
        if (res["status"] === 404) {
          toast.error("Incorrect email or password❗️");
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
        if (res["status"] === "success") {
          dispatch(userAction.login(res["token"]));
          dispatch(userAction.set(res["user"]["Tid"]));

          navigate(`/teacher/${res["user"]["Tid"]}`);
        }
      });
  }
  return (
    <div
      className={`flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 `}
    >
      <div
        style={{ width: prop["width"] - 70 }}
        className={`${classes.login_cont}`}
      >
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={(e) => setemail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={(e) => setpassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={login}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign In
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign Up{" "}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;
