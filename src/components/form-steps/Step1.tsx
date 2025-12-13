import { memo } from "react";
import { InputBlock, Input } from "@/components/shared/TextInput";
import PasswordInput from "@/components/shared/PasswordInput";

interface Step1Props {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
}

const Step1 = memo(
  ({ email, password, onEmailChange, onPasswordChange }: Step1Props) => {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">Account Information</h3>
        <div>
          <p className="mb-2">Email</p>
          <InputBlock variant="neubrutalism" size="lg">
            <Input
              type="email"
              placeholder="johndoe@gmail.com"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              className="outline-none border-none focus:outline-none focus:ring-0"
            />
          </InputBlock>
        </div>
        <div>
          <p className="mb-2">Password</p>
          <PasswordInput
            placeholder="Enter secure password"
            value={password}
            setValue={onPasswordChange}
            usingUseState={true}
          />
        </div>
        <div className="mt-4 p-4 ">
          <p className="text-sm ">
            Please provide your email and password to create your account.
          </p>
        </div>
      </div>
    );
  }
);

Step1.displayName = "Step1";

export default Step1;
