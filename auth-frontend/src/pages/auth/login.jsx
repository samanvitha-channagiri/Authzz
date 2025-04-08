import React from "react";
import { SiAuthelia } from "react-icons/si";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import CustomInput from "../../components/common/CustomInput";
function LoginPage() {
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold mb-10">Login</h1>
        <SiAuthelia className="text-5xl" />
      </div>
      <div>
        <form className="flex max-w-md flex-col gap-4">
          <div>
            <CustomInput
            label={'Your Email'}
              type="email"
              name="email"
              placeholder="example@gmail.com"
            />
          </div>
          <div>
            <CustomInput
             label={' Your Password'}
              type="password"
              name="password"
              placeholder="password"
            />
          </div>
          <div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
            </div>
            <Link to="/forget-password" className="text-cyan-700">
              Forgot password
            </Link>
          </div>
          <Button type="submit">Submit</Button>
        </form>
        <div className="text-center" pt-5>
          <span>
            you don't have account? <Link to="/register">Sign Up</Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
