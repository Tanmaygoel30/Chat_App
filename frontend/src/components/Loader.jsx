import React from "react";
import Lottie from "lottie-react";
import loadingAnim from "../assets/loadingAnim.json";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Lottie animationData={loadingAnim} className="w-64 h-64" loop />
    </div>
  );
};

export default Loader;
