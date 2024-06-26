import React, {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {RxCross2} from "react-icons/rx";
import Image from "next/image";
import {Reveal} from "../../app/assets";
import {yupResolver} from "@hookform/resolvers/yup";
import {Schema} from "./FormHelper";
import {useForm} from "react-hook-form";
import {ThreeDots} from "react-loader-spinner";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RevealPriceModal({
  setShowModal,
  setIsPrice,
  showModal,
  priceAnimation,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setdata] = useState({
    BusinessName: "",
    PhoneNo: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(Schema),
  });
  const form = useRef();

  const showToastMessage = () => {
    toast.success("Form Submitted Successfully");
  };
  const showToastErrorMessage = () => {
    toast.error("Something Went Wrong!");
  };
  const onSubmit = async (data) => {
    setIsLoading(true);
    reset();
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyK8mQbxLi7KvJfrFULeeO2R82JCqGyaMLGc7Vz_MF2_Qc4f1EoDN2QXEV5_5k2MDwpWA/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(data).toString(),
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setIsLoading(false);
      showToastMessage();
      console.log("Form data sent successfully");
      setShowModal(false);
      setIsPrice(true);
      localStorage.setItem("isPrice", true);
      priceAnimation();
      window.location.reload();
    } catch (error) {
      console.error("Error sending form data:", error);
      setIsLoading(false);
      showToastErrorMessage();
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
            className="fixed top-0 left-0 right-0 bottom-0 w-full h-full  z-[999]  bg-black/50  overflow-hidden flex justify-center   items-center">
            <motion.div
              initial={{scale: 0}}
              animate={{scale: 1}}
              exit={{scale: 0}}
              transition={{duration: 0.3}}
              className="bg-background md:w-[400px] w-[350px] px-6 py-6 h-auto mt-24   relative rounded-md shadow-lg">
              <div className="flex items-center justify-end w-full">
                <button
                  onClick={handleClose}
                  className="px-1 py-1 border rounded-full border-secondary">
                  <RxCross2 />
                </button>
              </div>
              <div className="flex items-center justify-center w-full">
                <Image
                  width={0}
                  height={0}
                  alt="image"
                  src={Reveal}
                  className="h-auto md:w-40 w-28 "
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <h2 className="text-2xl font-medium text-center text-secondary font-federo md:text-3xl">
                  Reveal Our Price
                </h2>
                <p className="text-sm font-normal text-center text-subheading font-poppins md:text-base">
                  Access Exclusive Pricing by Simply Entering Your Mobile Number
                </p>
                <form
                  ref={form}
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col items-center px-6">
                  <div className="w-full lg:mb-4 ">
                    <label
                      className="font-medium md:text-sm xl:text-base font-public text-secondary"
                      htmlFor="businessName">
                      Business name <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full p-3 md:mt-2 text-sm font-normal border-2 rounded-[10px] bgpt focus:outline-none focus:border-2 focus:border-primary text-secondary font-public border-bordercolor bg-background"
                      placeholder="Your business name"
                      type="text"
                      id="businessName"
                      defaultValue={data?.BusinessName}
                      {...register("BusinessName")} // Pass field name to register directly
                    />
                    <p className="mt-2 text-red-500">{errors.BusinessName?.message}</p>
                  </div>
                  <div className="mb-6">
                    <div className="w-full ">
                      <label
                        className="font-medium md:text-sm xl:text-base font-public text-secondary"
                        htmlFor="businessName">
                        Mobile number <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="w-full p-3 md:mt-2 text-sm font-normal border-2 rounded-[10px] bgpt focus:outline-none focus:border-2 focus:border-primary text-secondary font-public border-bordercolor bg-background"
                        placeholder="+91 123456789"
                        type="text"
                        id="MobileNuber"
                        defaultValue={data?.PhoneNo}
                        {...register("PhoneNo")}
                      />
                      <p className="mt-2 text-red-500">{errors.PhoneNo?.message}</p>
                    </div>
                  </div>
                  <div className="w-full">
                    <button
                      type="submit"
                      value="Send"
                      disabled={isLoading}
                      onClick={handleSubmit(onSubmit)}
                      className="relative z-10 font-federo text-[16px] flex h-[45px] w-full rounded-[10px]  items-center justify-center overflow-hidden text-white bg-primary">
                      {isLoading ? (
                        <ThreeDots width="50" color="#FFFFFF" />
                      ) : (
                        "Submit Now"
                      )}
                    </button>
                    <ToastContainer position="bottom-right" />
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
