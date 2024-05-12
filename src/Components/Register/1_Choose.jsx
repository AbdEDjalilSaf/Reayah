import React from 'react'
import ImageLoader from "../ImageLoader";
import Doctore from "../../../public/Register/Doctore.png";
import Patient from "../../../public/Register/Patient.png";
function Choose() {
  return (
      <div>
          <div className=" relative">
              <div>SignUp</div>
              <span className=" hidden md:block absolute  left-0 -z-10 bottom-[2px] w-full h-2 rounded-xl bg-green "></span>
          </div>
      </div>
  );
}

export default Choose