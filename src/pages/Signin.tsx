import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { API_URL } from "../config";

const Signin = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const { data } = await axios.post(API_URL + "/signin", values);
        if (data.status) {
          toast.success(data.message);
          formik.resetForm();
          localStorage.setItem("isLoggedIn", "1");
          localStorage.setItem("user", JSON.stringify(data.data));
          location.href = "/";
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Something went wrong! Try again.");
      }
      setLoading(false);
    },
  });

  return (
    <div className="bg-split-white-black px-4 md:p-12 xl:px-64">
      <h1 className="text-left text-white text-2xl lg:text-4xl font-bold">
        Sign In
      </h1>
      <p className="text-left text-white text-base mb-16 mt-2"></p>
      <form onSubmit={formik.handleSubmit}>
        <div className="rounded-md shadow-md bg-white p-4 md:p-10">
          <div className="md:flex my-4 border-b pb-4 justify-center">
            <div className="w-full md:w-4/12 lg:w-4/12 flex items-center">
              <p className="text-sm font-medium text-gray-600">Email</p>
            </div>
            <div className="w-full md:w-8/12 lg:w-9/12">
              <input
                type="text"
                className="mt-1 h-10 p-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-400 text-xs mt-2">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
          </div>
          <div className="md:flex my-4 border-b pb-4 justify-center">
            <div className="w-full md:w-4/12 lg:w-4/12 flex items-center">
              <p className="text-sm font-medium text-gray-600">Password</p>
            </div>
            <div className="w-full md:w-8/12 lg:w-9/12">
              <input
                type="password"
                className="mt-1 h-10 p-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-400 text-xs mt-2">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
          </div>
          <div className="md:flex my-4 border-b pb-4 justify-center">
            <div className="w-full lg:w-8/12">
              <button
                className="w-full inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-[#292E41] text-white hover:bg-slate-700"
                type="submit"
                disabled={loading}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
