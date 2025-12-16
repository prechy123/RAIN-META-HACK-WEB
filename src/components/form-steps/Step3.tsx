import { memo } from "react";
import { InputBlock, Input } from "@/components/shared/TextInput";

interface Step3Props {
  businessAddress: string;
  businessPhone: string;
  businessEmailAddress: string;
  businessWebsite: string;
  onBusinessAddressChange: (value: string) => void;
  onBusinessPhoneChange: (value: string) => void;
  onBusinessEmailAddressChange: (value: string) => void;
  onBusinessWebsiteChange: (value: string) => void;
}

const Step3 = memo(
  ({
    businessAddress,
    businessPhone,
    businessEmailAddress,
    businessWebsite,
    onBusinessAddressChange,
    onBusinessPhoneChange,
    onBusinessEmailAddressChange,
    onBusinessWebsiteChange,
  }: Step3Props) => {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">Contact Details</h3>
        <div>
          <p className="mb-2">Business Address or YardCode</p>
          <InputBlock variant="neubrutalism" size="lg">
            <Input
              placeholder="YardCode - GQ9 U88(BABA) or 20 oba adesida, ibadan"
              value={businessAddress}
              onChange={(e) => onBusinessAddressChange(e.target.value)}
              className="outline-none border-none focus:outline-none focus:ring-0"
            />
          </InputBlock>
        </div>
        <div>
          <p className="mb-2">Business Phone</p>
          <InputBlock variant="neubrutalism" size="lg">
            <Input
              placeholder="+234 803 456 7890"
              value={businessPhone}
              onChange={(e) => onBusinessPhoneChange(e.target.value)}
              className="outline-none border-none focus:outline-none focus:ring-0"
            />
          </InputBlock>
        </div>
        <div>
          <p className="mb-2">Business Email</p>
          <InputBlock variant="neubrutalism" size="lg">
            <Input
              type="email"
              placeholder="info@ekobites.ng"
              value={businessEmailAddress}
              onChange={(e) => onBusinessEmailAddressChange(e.target.value)}
              className="outline-none border-none focus:outline-none focus:ring-0"
            />
          </InputBlock>
        </div>
        <div>
          <p className="mb-2">Business Website</p>
          <InputBlock variant="neubrutalism" size="lg">
            <Input
              placeholder="https://www.ekobites.ng"
              value={businessWebsite}
              onChange={(e) => onBusinessWebsiteChange(e.target.value)}
              className="outline-none border-none focus:outline-none focus:ring-0"
            />
          </InputBlock>
        </div>
      </div>
    );
  }
);

Step3.displayName = "Step3";

export default Step3;
