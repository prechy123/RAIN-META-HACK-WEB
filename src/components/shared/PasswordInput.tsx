"use client";

import React, { SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({
  placeholder,
  name,
  value,
  setValue,
  usingUseState = false,
}: {
  placeholder?: string;
  name?: string;
  value?: string;
  setValue?: React.Dispatch<SetStateAction<string>> | ((value: string) => void);
  usingUseState?: boolean;
}) => {
  const [isView, setIsView] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setValue) {
      setValue(e.target.value);
    }
  };

  return (
    <div className=" relative">
      {usingUseState ? (
        setValue && (
          <Input
            // id="password"
            name={name ?? "password"}
            type={isView ? "text" : "password"}
            placeholder={placeholder ? placeholder : "Enter Password"}
            required
            minLength={7}
            value={value}
            onChange={handleChange}
          />
        )
      ) : (
        <Input
          // id="password"
          name={name ?? "password"}
          type={isView ? "text" : "password"}
          placeholder={placeholder ? placeholder : "Enter Password"}
          required
          minLength={7}
        />
      )}
      {isView ? (
        <Eye
          className="absolute right-4 top-2 z-10 cursor-pointer"
          onClick={() => {
            setIsView(!isView);
          }}
        />
      ) : (
        <EyeOff
          className="absolute right-4 top-2 z-10 cursor-pointer"
          onClick={() => setIsView(!isView)}
        />
      )}
    </div>
  );
};

export default React.memo(PasswordInput);
