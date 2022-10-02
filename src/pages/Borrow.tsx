import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { API_URL } from "../config";
import Preloader from "../components/Preloader";

const Borrow = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      inquiry: "",
      collateral: "",
      message: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      inquiry: Yup.string().required("Inquery is required"),
      collateral: Yup.string().required("Collateral is required"),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: async (values) => {
      if (
        !(document.getElementById("check1") as HTMLInputElement).checked ||
        !(document.getElementById("check2") as HTMLInputElement).checked
      ) {
        toast.warn(
          "Please agree to all the terms and conditions before submitting"
        );
        return;
      }
      setLoading(true);
      try {
        const { data } = await axios.post(API_URL + "/borrow-request", values);
        toast.success(data.message);
        formik.resetForm();
      } catch (error) {
        toast.error("Something went wrong! Try again.");
      }
      setLoading(false);
    },
  });

  if (!formik) {
    return (
      <Preloader />
    )
  }

  return (
    <div className="bg-split-white-black px-4 md:p-12 xl:px-64">
      <h1 className="text-left text-white text-2xl lg:text-4xl font-bold">
        Spade Oracle Application
      </h1>
      <p className="text-left text-white text-base mb-16 mt-2">
        Access the Spade Oracle: Credit-line, Terminal, and Depository.
      </p>
      <form onSubmit={formik.handleSubmit}>
        <div className="rounded-md shadow-md bg-white p-4 md:p-10">
          <div className="md:flex my-4 border-b pb-4 lg:justify-center">
            <div className="w-full md:w-12/12 flex items-center">
              <p className="text-2xl font-medium text-gray-600">Application</p>
            </div>
          </div>
          <div className="md:flex my-4 border-b pb-4 justify-center">
            <div className="w-full md:w-4/12 lg:w-4/12 flex items-center">
              <p className="text-sm font-medium text-gray-600">First Name</p>
            </div>
            <div className="w-full md:w-8/12 lg:w-9/12">
              <input
                type="text"
                className="mt-1 h-10 p-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                {...formik.getFieldProps("firstName")}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="text-red-400 text-xs mt-2">
                  {formik.errors.firstName}
                </div>
              ) : null}
            </div>
          </div>
          <div className="md:flex my-4 border-b pb-4 justify-center">
            <div className="w-full md:w-4/12 lg:w-4/12 flex items-center">
              <p className="text-sm font-medium text-gray-600">Last Name</p>
            </div>
            <div className="w-full md:w-8/12 lg:w-9/12">
              <input
                type="text"
                className="mt-1 h-10 p-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                {...formik.getFieldProps("lastName")}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="text-red-400 text-xs mt-2">
                  {formik.errors.lastName}
                </div>
              ) : null}
            </div>
          </div>
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
              <p className="text-sm font-medium text-gray-600">Phone Number</p>
            </div>
            <div className="w-full md:w-8/12 lg:w-9/12">
              <input
                type="text"
                className="mt-1 h-10 p-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                {...formik.getFieldProps("phone")}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-red-400 text-xs mt-2">
                  {formik.errors.phone}
                </div>
              ) : null}
            </div>
          </div>
          <div className="md:flex my-4 border-b pb-4 justify-center">
            <div className="w-full md:w-4/12 lg:w-4/12 flex items-center">
              <p className="text-sm font-medium text-gray-600">Inquiry</p>
            </div>
            <div className="w-full md:w-8/12 lg:w-9/12">
              <select
                className="mt-1 cursor-pointer block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...formik.getFieldProps("inquiry")}
              >
                <option value="">Select</option>
                <option value="Borrrowing">Borrrowing</option>
                <option value="Other">Other</option>
              </select>
              {formik.touched.inquiry && formik.errors.inquiry ? (
                <div className="text-red-400 text-xs mt-2">
                  {formik.errors.inquiry}
                </div>
              ) : null}
            </div>
          </div>
          <div className="md:flex my-4 border-b pb-4 justify-center">
            <div className="w-full md:w-4/12 lg:w-4/12 flex items-center">
              <p className="text-sm font-medium text-gray-600">Collateral</p>
            </div>
            <div className="w-full md:w-8/12 lg:w-9/12">
              <select
                className="mt-1 cursor-pointer block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...formik.getFieldProps("collateral")}
              >
                <option value="">Select</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Digital Assets">Digital Assets</option>
                <option value="Commodities">Commodities</option>
                <option value="Stocks">Stocks</option>
              </select>
              {formik.touched.collateral && formik.errors.collateral ? (
                <div className="text-red-400 text-xs mt-2">
                  {formik.errors.collateral}
                </div>
              ) : null}
            </div>
          </div>
          <div className="md:flex my-4 border-b pb-4 justify-center">
            <div className="w-full md:w-4/12 lg:w-4/12 flex items-center">
              <p className="text-sm font-medium text-gray-600">Message</p>
            </div>
            <div className="w-full md:w-8/12 lg:w-9/12">
              <textarea
                rows={3}
                className="shadow-sm p-4 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                {...formik.getFieldProps("message")}
              ></textarea>
              {formik.touched.message && formik.errors.message ? (
                <div className="text-red-400 text-xs mt-2">
                  {formik.errors.message}
                </div>
              ) : null}
            </div>
          </div>
          <div className="md:flex my-4 border-b pb-4 justify-center">
            <div className="w-full">
              <p className="text-sm">
                Spade Borrowing Services are available to select qualified
                institutional investors and accredited individuals who:
              </p>
              <br />
              <p className="text-sm">
                (a) have assets equal to or greater than $10,000,000 (including
                digital currency holdings, as applicable) and
              </p>
              <p className="text-sm">(b) are interested in and able to</p>
              <p className="text-sm pl-8">
                (i) trade in amounts equivalent to at least USD $250,000 per
                transaction (whether in cash or digital assets), or
              </p>
              <p className="text-sm pl-8">
                (ii) lend or borrow at least 100 BTC, 1,000 ETH or USD
                $2,000,000, whether in cash or stablecoins.
              </p>
              <br />
              <p className="text-sm">
                If you do not meet these minimums your application to onboard
                with Spade Oracle will not be considered.
              </p>
            </div>
          </div>
          <div className="md:flex my-4 border-b pb-4 justify-center">
            <div className="w-full">
              <label
                htmlFor="check1"
                className="text-sm cursor-pointer block mb-4"
              >
                <input
                  id="check1"
                  type="checkbox"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2 relative top-1"
                />
                I have read & agreed to the Spade Oracle's terms & conditions
              </label>
              <label htmlFor="check2" className="text-sm cursor-pointer block">
                <input
                  id="check2"
                  type="checkbox"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2 relative top-1"
                />
                I understand the minimum required requirements to borrow from
                Spade's Oracle
              </label>
            </div>
          </div>
          <div className="md:flex my-4 border-b pb-4 justify-center">
            <div className="w-full lg:w-8/12">
              <button
                className="w-full inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-[#292E41] text-white hover:bg-slate-700"
                type="submit"
                disabled={loading}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Borrow;
