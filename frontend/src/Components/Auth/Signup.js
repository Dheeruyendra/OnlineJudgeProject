import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userid: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const { name, userid, email, password, cpassword } = user;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleError = (msg) => {
    toast.error(msg, { position: "top-right" });
  };
  const handleSuccess = (msg) => {
    toast.success(msg, { position: "top-right" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8000/signup", user, {
        withCredentials: true,
      });
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate("/login"), 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
      handleError(error.response.data.message);
    }
    setUser({
      ...user,
      userid: "",
      email: "",
      password: "",
      cpassword: "",
    });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md px-6 py-8 space-y-8 rounded-lg shadow-lg bg-black md:px-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            <Link to="/">OJ</Link>
          </h1>
          <p className="mt-2 text-sm font-mono text-purple-300">
            Level Up Your Coding Skills
          </p>
        </div>
        <h1 className="font-mono text-center text-white mt-8 mb-8">
          Signup Account
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="userid"
              className="block text-sm font-mono text-purple-300"
            >
              UserID
            </label>
            <input
              id="userid"
              name="userid"
              type="text"
              required
              className="w-full rounded border-2 border-purple-300 bg-black px-3 py-2 text-white shadow focus:border-purple-500 focus:outline-none focus:ring"
              placeholder="Enter your username"
              value={userid}
              onChange={handleOnChange}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-mono text-purple-300"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded border-2 border-purple-300 bg-black px-3 py-2 text-white shadow focus:border-purple-500 focus:outline-none focus:ring"
              placeholder="Enter your email"
              value={email}
              onChange={handleOnChange}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-mono text-purple-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded border-2 border-purple-300 bg-black px-3 py-2 text-white shadow focus:border-purple-500 focus:outline-none focus:ring"
              placeholder="Enter your password"
              value={password}
              onChange={handleOnChange}
            />
          </div>

          <div>
            <label
              htmlFor="cpassword"
              className="block text-sm font-mono text-purple-300"
            >
              Confirm Password
            </label>
            <input
              id="cpassword"
              name="cpassword"
              type="password"
              required
              className="w-full rounded border-2 border-purple-300 bg-black px-3 py-2 text-white shadow focus:border-purple-500 focus:outline-none focus:ring"
              placeholder="Confirm password"
              value={cpassword}
              onChange={handleOnChange}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-purple-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-purple-600 focus:outline-none focus:ring"
          >
            Submit
          </button>

          <div className="text-center">
            <span className="text-white font-mono">
              Already have an account?{" "}
              <Link className="underline text-purple-300" to={"/login"}>
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;
