import React from "react";

const Loader = ({ message = "Loading…" }) => {
  return (
    <div className="py-16 flex flex-col items-center justify-center">
      <div className="w-12 h-12 rounded-full border-4 border-t-4 border-gray-200 border-t-blue-600 animate-spin mb-4" />
      <div className="text-gray-600 dark:text-gray-300">{message}</div>
    </div>
  );
};

export default Loader;
