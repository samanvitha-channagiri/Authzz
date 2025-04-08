import React from "react";
import { SiAuthelia } from "react-icons/si";
import { Button} from "flowbite-react";
import { Link } from "react-router-dom";
import CustomInput from "../../components/common/CustomInput";
function ForgetPasswordPage() {
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold mb-10">Forgot Password</h1>
        <SiAuthelia className="text-5xl" />
      </div>
      <div>
        <form className="flex max-w-md flex-col gap-4">
          <div>
            <CustomInput
              type="email"
              name="email"
              placeholder="example@gmail.com"
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
        <div className="text-center" pt-5>
          <span>
            you don't have account? <Link to="/login">Sign in </Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default ForgetPasswordPage;
