import React from "react";
import { Label,TextInput } from "flowbite-react";

const CustomInput = ({label,placeholder,name,...rest}) => {
  return (
    <>
      <div className="mb-2 block">
        <Label htmlFor={label} value={label}>{label}</Label>
      </div>
      <TextInput
   
        id={label}
        name={name}
        type="text"
        placeholder={placeholder}
        required
      />
    </>
  );
};

export default CustomInput;
