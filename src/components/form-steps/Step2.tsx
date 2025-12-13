import { memo } from "react";
import { InputBlock, Input } from "@/components/shared/TextInput";

interface Step2Props {
  businessName: string;
  businessDescription: string;
  businessCategory: string;
  onBusinessNameChange: (value: string) => void;
  onBusinessDescriptionChange: (value: string) => void;
  onBusinessCategoryChange: (value: string) => void;
}

const Step2 = memo(
  ({
    businessName,
    businessDescription,
    businessCategory,
    onBusinessNameChange,
    onBusinessDescriptionChange,
    onBusinessCategoryChange,
  }: Step2Props) => {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">Basic Business Info</h3>
        <div>
          <p className="mb-2">Business Name</p>
          <InputBlock variant="neubrutalism" size="lg">
            <Input
              placeholder="Eko Bites Restaurant"
              value={businessName}
              onChange={(e) => onBusinessNameChange(e.target.value)}
              className="outline-none border-none focus:outline-none focus:ring-0"
            />
          </InputBlock>
        </div>
        <div>
          <p className="mb-2">Business Description</p>
          <InputBlock variant="neubrutalism" size="lg">
            <Input
              placeholder="A modern Nigerian restaurant serving authentic local dishes..."
              value={businessDescription}
              onChange={(e) => onBusinessDescriptionChange(e.target.value)}
              className="w-full p-2 outline-none border-none focus:outline-none focus:ring-0 bg-transparent"
              //   rows={3}
            />
          </InputBlock>
        </div>
        <div>
          <p className="mb-2">Business Category</p>
          <InputBlock variant="neubrutalism" size="lg">
            <Input
              placeholder="Restaurant & Bar"
              value={businessCategory}
              onChange={(e) => onBusinessCategoryChange(e.target.value)}
              className="outline-none border-none focus:outline-none focus:ring-0"
            />
          </InputBlock>
        </div>
      </div>
    );
  }
);

Step2.displayName = "Step2";

export default Step2;
