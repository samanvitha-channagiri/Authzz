import React from "react";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownHeader,
  Navbar,
  NavbarBrand,
  NavbarToggle,
} from "flowbite-react";
import { SiAuthelia } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { IoMdLogIn } from 'react-icons/io';

const CustomNav = () => {
  const navigate = useNavigate();
  let isAuthenticated = false;

  return (
    <div>
      <Navbar fluid rounded>
        <NavbarBrand href="https://flowbite-react.com">
          <SiAuthelia className="text-2xl mr-2" />

          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Auth
          </span>
        </NavbarBrand>
        <div className="flex md:order-2">
          {isAuthenticated ? (
            <>
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    alt="User settings"
                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    rounded
                  />
                }
              >
                <DropdownHeader>
                  <span className="block text-sm">Bonnie Green</span>
                  <span className="block truncate text-sm font-medium">
                    name@flowbite.com
                  </span>
                </DropdownHeader>
              </Dropdown>
              <NavbarToggle />
            </>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className='bg-gradient-to-r from-teal-200 to-lime-200 text-gray-900 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-lime-200 dark:focus:ring-teal-700'
            >
              Login
              <IoMdLogIn className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </Navbar>
    </div>
  );
};

export default CustomNav;
