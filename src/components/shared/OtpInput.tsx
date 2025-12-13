import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React from "react";

export default function OtpInput({
  otp,
  setOtp,
}: {
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <InputOTP
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      value={otp}
      onChange={setOtp}
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} className="bg-[#ffffff]" />
        <InputOTPSlot index={1} className="bg-[#ffffff]" />
        <InputOTPSlot index={2} className="bg-[#ffffff]" />
        <InputOTPSlot index={3} className="bg-[#ffffff]" />
        <InputOTPSlot index={4} className="bg-[#ffffff]" />
        <InputOTPSlot index={5} className="bg-[#ffffff]" />
      </InputOTPGroup>
    </InputOTP>
  );
}
