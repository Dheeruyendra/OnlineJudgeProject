import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;
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
      const { data } = await axios.post("http://localhost:8000/login", user, {
        withCredentials: true,
      });

      const { success, message } = data;
      console.log(data);
      if (success) {
        handleSuccess(message);
        navigate("/");
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError(error.response.data.message);
    }
    setUser({
      ...user,
      email: "",
      password: "",
    });
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white sm:text-3xl font-mon">
            <Link to="/">OJ</Link>
          </h1>
          <p className="mt-1.5 text-sm font-mono text-purple-300">
            Level Up Your Coding Skills
          </p>
        </div>
        <h1 className="font-mono text-center text-white mt-8 mb-8">
          Login Account
        </h1>
        <form
          className="bg-black overflow-auto flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="ml-6 text-purple-300 text-sm font-mono mb-2"
              htmlFor="email"
            >
              Email{" "}
            </label>
            <input
              className="shadow apperance-none font-mono border-purple-300 bg-black border-2 rounded py-2 px-3  text-white leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-4">
            <label
              className=" text-purple-300 text-sm font-mono mb-2"
              htmlFor="password"
            >
              Password{" "}
            </label>
            <input
              className="shadow apperance-none font-mono border-purple-300 bg-black border-2 rounded py-2 px-3  text-white leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
          </div>
          <button
            className="inline-flex font-mono items-center justify-center gap-1.5 rounded-lg border border-purple-300 bg-purple-500 px-5 py-1 text-sm font-medium text-white transition hover:bg-black focus:outline-none focus:ring"
            type="submit"
          >
            Submit
          </button>
          <div className="mt-8">
            <span className="text-white font-mono">
              Register Here {": "}{" "}
              <Link className="underline text-purple-300" to={"/signup"}>
                Signup
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
