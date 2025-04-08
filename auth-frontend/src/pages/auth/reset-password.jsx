import React from "react";
import { SiAuthelia } from "react-icons/si";
import { Button } from "flowbite-react";
import CustomInput from "../../components/common/CustomInput";
import { PiCashRegister } from "react-icons/pi";
import {Link} from 'react-router-dom'
function ResetPasswordPage() {
  return (
    <>
      <div className="flex flex-col items-center gap-4">
      <PiCashRegister className="text-5xl"/>
        <h1 className="text-2xl font-bold mb-10">Reset Password</h1>
        <SiAuthelia className="text-5xl" />
      </div>
      <div>
        <form className="flex max-w-md flex-col gap-4">
       
         
          <div>
            <CustomInput
            label={'Your Password'}
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <div>
            <CustomInput
            label={'Repeat Password'}
              type="Confirm Password"
              name="confir Password"
              placeholder="Password"
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
        
      </div>
    </>
  );
}

export default ResetPasswordPage;

