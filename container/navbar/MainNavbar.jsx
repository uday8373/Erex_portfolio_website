"use client";
import React, {useEffect, useState} from "react";
import {styles} from "../../app/styles";
import {erexLogo, menu, close} from "@/app/assets";
import {navLinks} from "@/constants";
import {AnimatePresence, delay, motion} from "framer-motion";
import {Link, Link as ScrollLink} from "react-scroll";
import {RxCross2} from "react-icons/rx";
import {CgMenuRightAlt} from "react-icons/cg";

import Image from "next/image";
import {menuSilde} from "@/constants/framer_motion";
import {usePathname} from "next/navigation";
import ErexLogo from "@/components/firebase/ErexLogo";
import {Button} from "@/components/ui/moving-border";

const MainNavbar = () => {
  const pathname = usePathname();
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  const handleNavLinkClick = (id) => {
    localStorage.setItem("active", id);
    setActive(id);
  };

  useEffect(() => {
    const storedActive = localStorage.getItem("active");
    if (storedActive) {
      setActive(storedActive);
    }
    return () => {
      localStorage.removeItem("active");
    };
  }, []);

  const handleMobileNavLinkClick = () => {
    setToggle(!toggle);
    handleNavLinkClick("");
  };
  return (
    <nav
      className={` w-full flex items-center justify-center border-b-2 2xl:border-b-4   bg-background border-watermark fixed py-2 top-0 z-[999] md:py-4 `}>
      <div
        className={`${styles.xPadding}  w-full flex justify-between  max-w-screen-2xl items-center`}>
        <Link
          href="/"
          to="/"
          className="flex items-center"
          onClick={() => {
            setActive("");
            router.push("/");
            window.scrollTo(0, 0);
          }}>
          <ErexLogo />
        </Link>
        <div className="flex-row hidden gap-4 list-none lg:gap-6 xl:gap-10 md:flex">
          {navLinks.map((nav, index) => {
            return (
              <ScrollLink
                key={index}
                className={`${active === nav.id ? "text-primary" : "text-heading"}
               hover:text-primary text-[16px] lg:text-[18px] px-4 py-4 font-regular font-federo cursor-pointer nav-links  `}
                to={nav.id}
                spy={true}
                smooth={true}
                offset={-90}
                duration={300}
                onClick={() => {
                  handleNavLinkClick(nav.id);
                }}>
                {nav.title}
              </ScrollLink>
            );
          })}
          <ScrollLink
            to="contact"
            spy={true}
            offset={-90}
            smooth={true}
            duration={300}
            onClick={() => handleNavLinkClick("contact")}>
            {/* <button className="relative flex h-[44px] w-32 items-center justify-center overflow-hidden bg-gray-800 text-white transition-all before:absolute before:h-0 before:w-0 before:rounded-full bg-primary  before:bg-bghover before:duration-500 before:ease-out hover:shadow-bghover hover:before:h-56 hover:before:w-56">
              <span className="relative z-10 font-federo text-[16px]">Contact Us</span>
            </button> */}
            <Button className="relative flex items-center justify-center overflow-hidden text-white transition-all border-none  before:absolute before:h-0 before:w-0 before:rounded-full bg-primary before:bg-secondary before:duration-500 before:ease-out hover:shadow-bghover hover:before:h-56 hover:before:w-56">
              <span className="relative z-10 font-federo text-[16px]">Contact Us</span>
            </Button>
          </ScrollLink>
        </div>

        {/* mobile */}
        <div className="flex items-center justify-end flex-1 w-screen md:hidden">
          <div className=" md:hidden" onClick={handleMobileNavLinkClick}>
            {toggle ? (
              <CgMenuRightAlt color={"#4169E1"} size={30} />
            ) : (
              <CgMenuRightAlt color={"#4169E1"} size={30} />
            )}
          </div>

          <AnimatePresence mode="wait">
            {toggle && (
              <motion.div
                variants={menuSilde}
                animate="enter"
                exit="exit"
                initial="initial"
                className={`py-2 bg-background absolute top-0 left-0 w-screen h-screen z-10 menu `}>
                <div
                  className={`flex items-center  w-full px-6  pt-1 pb-6 justify-between border-b-2   border-watermark `}>
                  <Image
                    src={erexLogo}
                    alt="logo"
                    className={`sm:w-[85px]  sm:h-auto w-[120px]  object-contain `}
                  />
                  <div className="pt-4">
                    <RxCross2
                      color={"#4169E1"}
                      size={30}
                      onClick={() => setToggle(!toggle)}
                    />
                  </div>
                </div>
                <ul className="list-none flex flex-col px-6 gap-[0.5rem]  pt-10  items-start justify-center w-full">
                  {navLinks.map((nav, index) => {
                    return (
                      <motion.div
                        key={index}
                        initial={{x: 100, opacity: 0}}
                        animate={{
                          x: 0,
                          opacity: 1,
                          transition: {
                            duration: 0.8,
                            ease: [0.65, 0, 0.35, 1],
                            delay: 0.2 * index,
                          },
                        }}
                        exit={{
                          x: -100,
                          opacity: 0,
                          transition: {
                            duration: 0.6,
                            ease: [0.65, 0, 0.35, 1],
                            delay: 0.3 * index,
                          },
                        }}>
                        <ScrollLink
                          onClick={() => handleMobileNavLinkClick(nav.id)}
                          key={index}
                          className={`${
                            active === nav.title ? "text-heading" : "text-heading"
                          } hover:text-primary text-[24px] mt-5 font-medium font-poppins uppercase cursor-pointer w-full  flex`}
                          to={nav.id}
                          spy={true}
                          smooth={true}
                          offset={-70}
                          duration={300}>
                          {nav.title}
                        </ScrollLink>
                      </motion.div>
                    );
                  })}
                </ul>
                <ScrollLink
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={300}>
                  <button
                    onClick={() => handleMobileNavLinkClick("#contact")}
                    className="relative my-8 mx-6 flex h-[50px] w-40 items-center justify-center overflow-hidden  text-white transition-all before:absolute before:h-0 before:w-0 before:rounded-full bg-primary  before:bg-bghover before:duration-500 before:ease-out hover:shadow-bghover hover:before:h-56 hover:before:w-56">
                    <span className="relative z-10 font-federo text-[20px]">
                      Contact Us
                    </span>
                  </button>
                </ScrollLink>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
