import React from "react";
import { SiAuthelia } from "react-icons/si";
import { Button } from "flowbite-react";
import CustomInput from "../../components/common/CustomInput";
import { PiCashRegister } from "react-icons/pi";
import {Link} from 'react-router-dom'
function RegisterPage() {
  return (
    <>
      <div className="flex flex-col items-center gap-4">
      <PiCashRegister className="text-5xl"/>
        <h1 className="text-2xl font-bold mb-10">Login</h1>
        <SiAuthelia className="text-5xl" />
      </div>
      <div>
        <form className="flex max-w-md flex-col gap-4">
        <div>
            <CustomInput
            label={'User Name'}
              type="text"
              name="username"
              placeholder="shankar"
            />
          </div>
          <div>
            <CustomInput
                label={'Email'}
              type="email"
              name="email"
              placeholder="example@gmail.com"
            />
          </div>
          <div>
            <CustomInput
                label={'Password'}
              type="password"
              name="password"
              placeholder="password"
            />
          </div>
          <div>
            <CustomInput
            label={' Repeat Password'}
              type="Confirm Password"
              name="confirmPassword"
              placeholder="password"
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
        <div className='text-center' pt-5>
      <span>
        You already have an account? <Link to='/login'>Sign In</Link>
      </span>
    </div>
      </div>
    </>
  );
}

export default RegisterPage;
