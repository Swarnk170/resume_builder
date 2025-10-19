import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="size-12 border-3 rounded-full border-gray-400 border-t-transparent animate-spin"></div>
    </div>
  );
};

export default Loader;
