import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { delay, motion } from "framer-motion";

export default function Intro() {
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/main");
    }, 4000); // 인트로가 시작된 후 3초가 지나면 /main 페이지로 이동하게 설정
    return () => {
      clearTimeout(timeout);
    };
  }, [navigate]);

  //로고 애니메이션
  const logoVariants = {
    normal: { opacity: 0, scale: 1.2 },
    active: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.5,
      },
    },
  };

  const logoBlackVariants = {
    normal: { opacity: 0 },
    active: {
      opacity: 1,
      x: 10,
      y: 10,
      transition: {
        duration: 1,
        delay: 1.5,
      },
    },
  };

  const pageOverVariants = {
    hidden: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <IntroContainer
        variants={pageOverVariants}
        initial={"hidden"}
        exit={"exit"}
        onAnimationComplete={() => navigate("/main")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 276.742"
          className={"logo"}
        >
          <motion.path
            variants={logoVariants}
            initial={"normal"}
            animate={"active"}
            d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 276.742"
          className={"logoBlack"}
        >
          <motion.path
            variants={logoBlackVariants}
            initial={"normal"}
            animate={"active"}
            d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
          />
        </svg>
      </IntroContainer>
    </>
  );
}

const IntroContainer = styled(motion.div)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  align-items: center;
  background-color: black;
  .logo {
    width: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* color: red; */
    fill: red;
    z-index: 2;
  }
  .logoBlack {
    position: absolute;
    top: 50%;
    left: 50%;
    fill: #333;
    transform: translate(-50%, -50%);
  }
`;
