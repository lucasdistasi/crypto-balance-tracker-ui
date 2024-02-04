import {Link} from "react-router-dom";
import React from "react";

const NoCryptosFoundAlert = () => {

  return (
    <div className="flex flex-col items-center min-h-screen w-full">
      <div className="bg-gray-100 border-t border-b border-gray-500 text-gray-700 px-4 py-3 my-8 w-10/12"
           role="alert">
        <p className="font-bold">No Cryptos found</p>
        <p className="text-sm">
          Looks like you've no cryptos added. Go to <Link to="/crypto"><span
          className="font-bold italic">this link</span></Link> to
          add a crypto and start viewing insights.
        </p>
      </div>
    </div>
  );
}

export default NoCryptosFoundAlert